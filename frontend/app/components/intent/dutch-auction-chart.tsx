'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { IntentRecord, DutchPricePoint } from '@/app/lib/velox/types';
import { Separator } from '../ui/separator';
import { TrendingDown, Timer, DollarSign, Trophy } from 'lucide-react';

interface DutchAuctionChartProps {
  intent: IntentRecord;
}

function formatPrice(price: bigint): string {
  // Prices are stored as token amounts with 8 decimals
  return (Number(price) / 1e8).toFixed(4);
}

function formatAmount(amount: bigint): string {
  return (Number(amount) / 1e8).toFixed(4);
}

function truncateAddress(addr: string): string {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function formatTimeRemaining(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return 'Ended';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

export function DutchAuctionChart({ intent }: DutchAuctionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [currentPrice, setCurrentPrice] = useState<bigint>(intent.auctionStartPrice ?? BigInt(0));
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [elapsedPercent, setElapsedPercent] = useState<number>(0);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Prices are stored as token amounts with 8 decimals
  // Default to reasonable values if not set
  // Handle NaN values properly (NaN ?? default doesn't work, must use explicit check)
  const rawStartPrice = intent.auctionStartPrice;
  const rawEndPrice = intent.auctionEndPrice;
  const rawDuration = intent.auctionDuration;

  // Convert prices to BigInt, handling various input types
  const startPrice = typeof rawStartPrice === 'bigint' ? rawStartPrice :
                     rawStartPrice ? BigInt(rawStartPrice) : BigInt(3000000000);
  const endPrice = typeof rawEndPrice === 'bigint' ? rawEndPrice :
                   rawEndPrice ? BigInt(rawEndPrice) : BigInt(2500000000);
  // Handle NaN duration - use isNaN check since NaN ?? 60 doesn't work
  const duration = (typeof rawDuration === 'number' && !isNaN(rawDuration) && rawDuration > 0)
    ? rawDuration : 60;
  const startTime = intent.auctionStartTime ?? intent.createdAt;
  const isActive = intent.auctionStatus === 'active';
  const purchasePrice = intent.auctionAcceptedPrice;
  const purchaseTime = intent.status === 'filled' ? (intent.auctionEndTime ?? startTime + duration / 2) : null;

  // Calculate current price based on Dutch auction QUADRATIC curve
  // Formula: price = startPrice - priceRange * (elapsed/duration)^2
  // This creates a curve that starts slow (price stays high longer) and accelerates downward
  const calculateCurrentPrice = useCallback((elapsedSeconds: number): bigint => {
    if (duration <= 0) return startPrice;
    if (elapsedSeconds >= duration) return endPrice;
    if (elapsedSeconds <= 0) return startPrice;

    const priceRange = Number(startPrice - endPrice);
    // Quadratic decay: (elapsed/duration)^2
    const ratio = elapsedSeconds / duration;
    const ratioSquared = ratio * ratio;
    const priceDrop = priceRange * ratioSquared;

    if (isNaN(priceDrop) || !isFinite(priceDrop)) return startPrice;
    return startPrice - BigInt(Math.floor(priceDrop));
  }, [startPrice, endPrice, duration]);

  // Update countdown and current price
  useEffect(() => {
    const safeDuration = duration > 0 ? duration : 1;

    // For completed auctions, show the purchase price as current
    if (!isActive) {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - startTime;
      setElapsedPercent(100); // Completed
      // Show actual purchase price if available, otherwise show end price
      setCurrentPrice(purchasePrice ?? endPrice);
      setTimeRemaining(0);
      return;
    }

    const updateState = () => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - startTime;
      const remaining = Math.max(0, startTime + safeDuration - now);

      setTimeRemaining(remaining);
      setElapsedPercent(Math.min(100, (elapsed / safeDuration) * 100));
      setCurrentPrice(calculateCurrentPrice(elapsed));
    };

    updateState();
    const timer = setInterval(updateState, 100); // Update frequently for smooth animation
    return () => clearInterval(timer);
  }, [isActive, startTime, duration, calculateCurrentPrice, purchasePrice, endPrice]);

  // Observe container size for proper canvas dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setCanvasSize({ width: rect.width - 16, height: 200 }); // minus padding
      }
    };

    // Initial size
    updateSize();

    // Use ResizeObserver for dynamic updates
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Draw the chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvasSize.width <= 0 || canvasSize.height <= 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get computed colors from CSS variables (they are hex colors)
    const computedStyle = getComputedStyle(document.documentElement);
    const bgColor = computedStyle.getPropertyValue('--background').trim() || '#0c0a09';
    const primaryColor = computedStyle.getPropertyValue('--primary').trim() || '#c2956a';
    const mutedFgColor = computedStyle.getPropertyValue('--muted-foreground').trim() || '#a8a29e';
    const borderColor = computedStyle.getPropertyValue('--border').trim() || '#44403c';

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    ctx.scale(dpr, dpr);

    const width = canvasSize.width;
    const height = canvasSize.height;
    const padding = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas with actual background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Price to Y coordinate
    const priceToY = (price: bigint): number => {
      const priceNum = Number(price);
      const startNum = Number(startPrice);
      const endNum = Number(endPrice);
      const range = startNum - endNum;
      if (range === 0) return padding.top + chartHeight / 2;
      const fromTop = (startNum - priceNum) / range;
      return padding.top + fromTop * chartHeight;
    };

    // Time to X coordinate (0 to duration)
    const safeDuration = duration > 0 ? duration : 1;
    const timeToX = (t: number): number => {
      return padding.left + (t / safeDuration) * chartWidth;
    };

    // Draw grid lines
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 0.5;

    // Horizontal grid (price)
    for (let i = 0; i <= 4; i++) {
      const price = startPrice - BigInt(Math.floor(Number(startPrice - endPrice) * (i / 4)));
      const y = priceToY(price);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Price labels
      ctx.fillStyle = mutedFgColor;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(formatPrice(price), padding.left - 5, y + 3);
    }

    // Vertical grid (time)
    for (let i = 0; i <= 4; i++) {
      const t = (safeDuration * i) / 4;
      const x = timeToX(t);
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
      ctx.stroke();

      // Time labels - show decimals for short durations
      ctx.fillStyle = mutedFgColor;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      const timeLabel = safeDuration < 10 ? `${t.toFixed(1)}s` : `${Math.floor(t)}s`;
      ctx.fillText(timeLabel, x, height - 10);
    }

    // Calculate current elapsed time
    const now = Math.floor(Date.now() / 1000);
    const elapsed = Math.min(safeDuration, now - startTime);
    const purchaseElapsed = purchaseTime ? Math.max(0, purchaseTime - startTime) : null;

    // For completed auctions, draw the entire curve
    const isCompleted = intent.status === 'filled' || intent.auctionStatus === 'completed';

    // Draw the declining price curve (actual - solid primary)
    ctx.beginPath();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // For completed auctions, draw the full curve; for active, draw up to current time
    const stopTime = isCompleted ? safeDuration : (purchaseElapsed ?? Math.min(elapsed, safeDuration));
    const step = Math.max(0.5, safeDuration / 100); // Dynamic step size for smooth curves

    for (let t = 0; t <= stopTime; t += step) {
      const price = calculateCurrentPrice(t);
      const x = timeToX(t);
      const y = priceToY(price);
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    // Ensure we draw to the exact end
    if (stopTime > 0) {
      const endX = timeToX(stopTime);
      const endY = priceToY(calculateCurrentPrice(stopTime));
      ctx.lineTo(endX, endY);
    }
    ctx.stroke();

    // If purchase was made, draw dotted line showing what would have happened
    if (purchaseElapsed !== null && purchaseElapsed < safeDuration) {
      ctx.beginPath();
      ctx.strokeStyle = mutedFgColor;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      for (let t = purchaseElapsed; t <= safeDuration; t += 0.5) {
        const price = calculateCurrentPrice(t);
        const x = timeToX(t);
        const y = priceToY(price);
        if (t === purchaseElapsed) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw purchase point
      const purchaseX = timeToX(purchaseElapsed);
      const purchaseY = priceToY(purchasePrice ?? calculateCurrentPrice(purchaseElapsed));

      // Pulsing circle effect
      ctx.beginPath();
      ctx.arc(purchaseX, purchaseY, 12, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor + '33'; // 20% opacity
      ctx.fill();

      ctx.beginPath();
      ctx.arc(purchaseX, purchaseY, 8, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor + '66'; // 40% opacity
      ctx.fill();

      ctx.beginPath();
      ctx.arc(purchaseX, purchaseY, 5, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor;
      ctx.fill();

      // Label for purchase point
      ctx.fillStyle = primaryColor;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('SOLD', purchaseX + 15, purchaseY + 4);
    }

    // For completed auctions without specific purchase point, show SOLD marker
    if (isCompleted && (purchaseElapsed === null || purchaseElapsed >= safeDuration)) {
      // Use actual purchase price if available, otherwise fall back to end price
      const actualSoldPrice = purchasePrice ?? endPrice;

      // Calculate the time position based on the sold price (quadratic curve inverse)
      // For quadratic: price = startPrice - priceRange * (t/duration)^2
      // Solving for t: t = duration * sqrt((startPrice - price) / priceRange)
      const priceRange = Number(startPrice - endPrice);
      let soldTime = safeDuration;
      if (priceRange > 0 && actualSoldPrice) {
        const priceDiff = Number(startPrice - actualSoldPrice);
        const ratio = priceDiff / priceRange;
        // Quadratic inverse: t = duration * sqrt(ratio)
        soldTime = Math.min(safeDuration, Math.max(0, safeDuration * Math.sqrt(ratio)));
      }

      const soldX = timeToX(soldTime);
      const soldY = priceToY(actualSoldPrice);

      // Circle marker
      ctx.beginPath();
      ctx.arc(soldX, soldY, 10, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor + '33';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(soldX, soldY, 6, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor + '66';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(soldX, soldY, 4, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor;
      ctx.fill();

      // SOLD label with price - position left of marker if near right edge
      const labelText = `SOLD @ ${formatPrice(actualSoldPrice)}`;
      ctx.font = 'bold 10px sans-serif';
      const labelWidth = ctx.measureText(labelText).width;
      const rightEdge = width - padding.right;

      ctx.fillStyle = primaryColor;
      // If label would overflow right edge, position it to the left of the marker
      if (soldX + 12 + labelWidth > rightEdge) {
        ctx.textAlign = 'right';
        ctx.fillText(labelText, soldX - 12, soldY + 4);
      } else {
        ctx.textAlign = 'left';
        ctx.fillText(labelText, soldX + 12, soldY + 4);
      }
    }

    // If still active, draw current price indicator
    if (isActive && elapsed < safeDuration) {
      const currentX = timeToX(elapsed);
      const currentY = priceToY(currentPrice);

      // Animated glow effect
      const glowSize = 8 + Math.sin(Date.now() / 200) * 2;

      ctx.beginPath();
      ctx.arc(currentX, currentY, glowSize + 4, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor + '26'; // 15% opacity
      ctx.fill();

      ctx.beginPath();
      ctx.arc(currentX, currentY, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor + '4d'; // 30% opacity
      ctx.fill();

      ctx.beginPath();
      ctx.arc(currentX, currentY, 5, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor;
      ctx.fill();

      // Current price label
      ctx.fillStyle = primaryColor;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(formatPrice(currentPrice), currentX + 12, currentY + 4);
    }

    // Request next frame for animation
    if (isActive) {
      animationRef.current = requestAnimationFrame(() => {
        // Trigger re-render
      });
    }
  }, [currentPrice, isActive, startPrice, endPrice, duration, startTime, purchasePrice, purchaseTime, calculateCurrentPrice, elapsedPercent, canvasSize]);

  // Animation loop
  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      setCurrentPrice((prev) => prev); // Force re-render
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isActive]);

  return (
    <>
      <Separator />
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Dutch Auction Price</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-3 w-3 text-muted-foreground" />
            <span className={`text-sm font-bold ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
              {formatTimeRemaining(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Price Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded bg-muted/30 text-center">
            <p className="text-xs text-muted-foreground">Start Price</p>
            <p className="font-bold text-sm">{formatPrice(startPrice)}</p>
          </div>
          <div className={`p-2 rounded text-center ${isActive ? 'bg-primary/20' : 'bg-muted/30'}`}>
            <p className="text-xs text-muted-foreground">Current</p>
            <p className={`font-bold text-sm ${isActive ? 'text-primary' : ''}`}>
              {formatPrice(currentPrice)}
            </p>
          </div>
          <div className="p-2 rounded bg-muted/30 text-center">
            <p className="text-xs text-muted-foreground">End Price</p>
            <p className="font-bold text-sm">{formatPrice(endPrice)}</p>
          </div>
        </div>

        {/* Chart Canvas */}
        <div ref={containerRef} className="relative rounded-lg border border-border bg-card p-2">
          <canvas
            ref={canvasRef}
            width={canvasSize.width || 300}
            height={canvasSize.height || 200}
            style={{ display: 'block', width: '100%', height: '200px' }}
          />
        </div>

        {/* Purchase Info */}
        {purchasePrice && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm">Purchased At</span>
            </div>
            <span className="font-bold text-primary">{formatPrice(purchasePrice)}</span>
          </div>
        )}

        {/* Winner Info */}
        {intent.auctionWinner && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm">Winning Solver</span>
            </div>
            <a
              href={`https://explorer.movementnetwork.xyz/account/${intent.auctionWinner}?network=testnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:underline"
            >
              {truncateAddress(intent.auctionWinner)}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
