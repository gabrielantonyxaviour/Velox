'use client';

import { useEffect, useRef } from 'react';
import { TrendingDown } from 'lucide-react';

interface DutchAuctionPreviewProps {
  startPrice: number;  // in token units (not raw)
  endPrice: number;    // in token units (not raw)
  duration: number;    // in seconds
  outputSymbol?: string;
}

export function DutchAuctionPreview({
  startPrice,
  endPrice,
  duration,
  outputSymbol = 'tokens',
}: DutchAuctionPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get computed colors from CSS variables
    const computedStyle = getComputedStyle(document.documentElement);
    const bgColor = computedStyle.getPropertyValue('--background').trim() || '0 0% 7%';
    const mutedFgColor = computedStyle.getPropertyValue('--muted-foreground').trim() || '0 0% 45%';
    const borderColor = computedStyle.getPropertyValue('--border').trim() || '0 0% 15%';

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 15, right: 15, bottom: 25, left: 45 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.fillStyle = `hsl(${bgColor})`;
    ctx.fillRect(0, 0, width, height);

    // Price range
    const priceRange = startPrice - endPrice;
    if (priceRange <= 0) return;

    // Price to Y coordinate
    const priceToY = (price: number): number => {
      const fromTop = (startPrice - price) / priceRange;
      return padding.top + fromTop * chartHeight;
    };

    // Time to X coordinate
    const timeToX = (t: number): number => {
      return padding.left + (t / duration) * chartWidth;
    };

    // Draw grid
    ctx.strokeStyle = `hsl(${borderColor})`;
    ctx.lineWidth = 0.5;

    // Horizontal grid (prices)
    for (let i = 0; i <= 2; i++) {
      const price = startPrice - (priceRange * i) / 2;
      const y = priceToY(price);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Price labels
      ctx.fillStyle = `hsl(${mutedFgColor})`;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(2), padding.left - 5, y + 3);
    }

    // Vertical grid (time markers)
    for (let i = 0; i <= 2; i++) {
      const t = (duration * i) / 2;
      const x = timeToX(t);
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
      ctx.stroke();

      // Time labels
      ctx.fillStyle = `hsl(${mutedFgColor})`;
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      const label = t >= 60 ? `${Math.floor(t / 60)}m` : `${t}s`;
      ctx.fillText(label, x, height - 8);
    }

    // Draw the price curve gradient fill
    const gradient = ctx.createLinearGradient(padding.left, 0, width - padding.right, 0);
    gradient.addColorStop(0, 'hsla(30, 52%, 52%, 0.3)');
    gradient.addColorStop(1, 'hsla(30, 52%, 52%, 0.05)');

    ctx.beginPath();
    ctx.moveTo(padding.left, priceToY(startPrice));
    for (let t = 0; t <= duration; t += duration / 50) {
      const price = startPrice - (priceRange * t) / duration;
      ctx.lineTo(timeToX(t), priceToY(price));
    }
    ctx.lineTo(timeToX(duration), height - padding.bottom);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw the main price curve
    ctx.beginPath();
    ctx.strokeStyle = 'hsl(30, 52%, 52%)'; // primary color
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.moveTo(padding.left, priceToY(startPrice));
    for (let t = 0; t <= duration; t += duration / 50) {
      const price = startPrice - (priceRange * t) / duration;
      ctx.lineTo(timeToX(t), priceToY(price));
    }
    ctx.stroke();

    // Draw start point
    ctx.beginPath();
    ctx.arc(padding.left, priceToY(startPrice), 4, 0, Math.PI * 2);
    ctx.fillStyle = 'hsl(30, 52%, 52%)';
    ctx.fill();

    // Draw end point
    ctx.beginPath();
    ctx.arc(timeToX(duration), priceToY(endPrice), 4, 0, Math.PI * 2);
    ctx.fillStyle = 'hsl(30, 52%, 52%)';
    ctx.fill();

  }, [startPrice, endPrice, duration]);

  if (startPrice <= 0 || endPrice <= 0 || startPrice <= endPrice) {
    return null;
  }

  const priceDropPercent = ((startPrice - endPrice) / startPrice * 100).toFixed(0);

  return (
    <div className="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-primary">
          <TrendingDown className="h-3 w-3" />
          <span>Price Curve Preview</span>
        </div>
        <span className="text-xs text-muted-foreground">
          -{priceDropPercent}% over {duration >= 60 ? `${duration / 60}m` : `${duration}s`}
        </span>
      </div>

      <div className="relative rounded border border-primary/20 bg-background overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-[100px]"
          style={{ display: 'block' }}
        />
      </div>

      <div className="flex justify-between text-xs">
        <div className="text-center">
          <span className="text-muted-foreground">Start: </span>
          <span className="text-primary font-mono">{startPrice.toFixed(4)}</span>
        </div>
        <div className="text-center">
          <span className="text-muted-foreground">End: </span>
          <span className="text-muted-foreground font-mono">{endPrice.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
}
