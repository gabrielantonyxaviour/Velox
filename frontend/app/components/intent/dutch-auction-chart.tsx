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
  const animationRef = useRef<number>();
  const [currentPrice, setCurrentPrice] = useState<bigint>(intent.auctionStartPrice ?? BigInt(0));
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [elapsedPercent, setElapsedPercent] = useState<number>(0);

  // Prices are stored as token amounts with 8 decimals
  // Default to reasonable values if not set (should rarely happen)
  const startPrice = intent.auctionStartPrice ?? BigInt(3000000000); // Default 30.0
  const endPrice = intent.auctionEndPrice ?? BigInt(2500000000);     // Default 25.0
  const duration = intent.auctionDuration ?? 60;
  const startTime = intent.auctionStartTime ?? intent.createdAt;
  const isActive = intent.auctionStatus === 'active';
  const purchasePrice = intent.auctionAcceptedPrice;
  const purchaseTime = intent.status === 'filled' ? (intent.auctionEndTime ?? startTime + duration / 2) : null;

  // Calculate current price based on Dutch auction curve
  const calculateCurrentPrice = useCallback((elapsedSeconds: number): bigint => {
    if (duration <= 0) return startPrice;
    if (elapsedSeconds >= duration) return endPrice;
    if (elapsedSeconds <= 0) return startPrice;

    const priceRange = Number(startPrice - endPrice);
    const priceDrop = (priceRange * elapsedSeconds) / duration;
    if (isNaN(priceDrop) || !isFinite(priceDrop)) return startPrice;
    return startPrice - BigInt(Math.floor(priceDrop));
  }, [startPrice, endPrice, duration]);

  // Update countdown and current price
  useEffect(() => {
    const safeDuration = duration > 0 ? duration : 1;

    if (!isActive && !purchasePrice) {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - startTime;
      setElapsedPercent(Math.min(100, (elapsed / safeDuration) * 100));
      setCurrentPrice(calculateCurrentPrice(elapsed));
      setTimeRemaining(Math.max(0, safeDuration - elapsed));
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
  }, [isActive, startTime, duration, calculateCurrentPrice, purchasePrice]);

  // Draw the chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get computed colors from CSS variables
    const computedStyle = getComputedStyle(document.documentElement);
    const bgColor = computedStyle.getPropertyValue('--background').trim() || '0 0% 7%';
    const primaryColor = computedStyle.getPropertyValue('--primary').trim() || '35 92% 65%';
    const mutedFgColor = computedStyle.getPropertyValue('--muted-foreground').trim() || '0 0% 45%';
    const borderColor = computedStyle.getPropertyValue('--border').trim() || '0 0% 15%';

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas with actual background color
    ctx.fillStyle = `hsl(${bgColor})`;
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
    ctx.strokeStyle = `hsl(${borderColor})`;
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
      ctx.fillStyle = `hsl(${mutedFgColor})`;
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

      // Time labels
      ctx.fillStyle = `hsl(${mutedFgColor})`;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.floor(t)}s`, x, height - 10);
    }

    // Calculate current elapsed time
    const now = Math.floor(Date.now() / 1000);
    const elapsed = Math.min(safeDuration, now - startTime);
    const purchaseElapsed = purchaseTime ? purchaseTime - startTime : null;

    // Draw the declining price curve (actual - solid primary)
    ctx.beginPath();
    ctx.strokeStyle = `hsl(${primaryColor})`;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const stopTime = purchaseElapsed ?? elapsed;
    for (let t = 0; t <= stopTime; t += 0.5) {
      const price = calculateCurrentPrice(t);
      const x = timeToX(t);
      const y = priceToY(price);
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // If purchase was made, draw dotted line showing what would have happened
    if (purchaseElapsed !== null && purchaseElapsed < safeDuration) {
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${mutedFgColor})`;
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
      ctx.fillStyle = `hsla(${primaryColor}, 0.2)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(purchaseX, purchaseY, 8, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${primaryColor}, 0.4)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(purchaseX, purchaseY, 5, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${primaryColor})`;
      ctx.fill();

      // Label for purchase point
      ctx.fillStyle = `hsl(${primaryColor})`;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('SOLD', purchaseX + 15, purchaseY + 4);
    }

    // If still active, draw current price indicator
    if (isActive && elapsed < safeDuration) {
      const currentX = timeToX(elapsed);
      const currentY = priceToY(currentPrice);

      // Animated glow effect
      const glowSize = 8 + Math.sin(Date.now() / 200) * 2;

      ctx.beginPath();
      ctx.arc(currentX, currentY, glowSize + 4, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(45, 100%, 50%, 0.15)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(currentX, currentY, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(45, 100%, 50%, 0.3)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(currentX, currentY, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(45, 100%, 50%)';
      ctx.fill();

      // Current price label
      ctx.fillStyle = 'hsl(45, 100%, 50%)';
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
  }, [currentPrice, isActive, startPrice, endPrice, duration, startTime, purchasePrice, purchaseTime, calculateCurrentPrice, elapsedPercent]);

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
        <div className="relative rounded-lg border border-border bg-card p-2">
          <canvas
            ref={canvasRef}
            className="w-full h-[200px]"
            style={{ display: 'block' }}
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
