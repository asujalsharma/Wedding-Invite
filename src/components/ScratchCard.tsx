import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScratchCardProps {
  children: React.ReactNode;
  className?: string;
  cardLabel?: string;
  id?: string;
  brushSize?: number;
  revealThreshold?: number; // 0.35 = 35% scratched to auto-reveal
  onRevealed?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  children,
  className = '',
  cardLabel = 'Scratch',
  brushSize = 22,
  revealThreshold = 0.35,
  onRevealed
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize Canvas Foil
  const initFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    // Luxury Champagne Gold Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#D4B06A');
    grad.addColorStop(0.25, '#F7E7BE');
    grad.addColorStop(0.5, '#BE9B4E');
    grad.addColorStop(0.75, '#FFF2D2');
    grad.addColorStop(1, '#A88435');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Subtle decorative border pattern inside the foil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(6, 6, rect.width - 12, rect.height - 12);

    // Center Label / Icon
    ctx.fillStyle = '#6E4E18';
    ctx.font = '600 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH ✦', rect.width / 2, rect.height / 2 - 2);

    ctx.fillStyle = '#8C6826';
    ctx.font = 'italic 9px "Cormorant Garamond", serif';
    ctx.fillText('to reveal', rect.width / 2, rect.height / 2 + 12);
  }, []);

  useEffect(() => {
    if (!isRevealed) {
      initFoil();
    }
  }, [initFoil, isRevealed]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!isRevealed) {
        initFoil();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initFoil, isRevealed]);

  // Check how much percentage has been scratched
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;

    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalPixels = pixels.length / 4;
      const step = 8; // sample every 8th pixel for instant performance

      for (let i = 3; i < pixels.length; i += 4 * step) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const sampleTotal = totalPixels / step;
      const ratio = transparentCount / sampleTotal;

      if (ratio >= revealThreshold) {
        revealCard();
      }
    } catch (e) {
      // ignore security restrictions if any
    }
  };

  const revealCard = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    onRevealed?.();

    // Trigger subtle sparkles
    try {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#9E1B32', '#F59E0B', '#FFF9E6']
      });
    } catch (e) {
      // ignore
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    setHasStarted(true);
  };

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratching || isRevealed) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    if (isScratching) {
      setIsScratching(false);
      checkScratchPercentage();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none touch-none ${className}`}
    >
      {/* Content to be revealed underneath */}
      <div className="w-full h-full">
        {children}
      </div>

      {/* Foil Scratch Layer */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`absolute inset-0 cursor-crosshair z-20 transition-opacity duration-500 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ touchAction: 'none' }}
        />
      )}

      {/* Quick Tap Helper */}
      {!isRevealed && hasStarted && (
        <button
          type="button"
          onClick={revealCard}
          className="absolute bottom-1 right-1 z-30 text-[9px] font-sans uppercase tracking-wider text-[#6E4E18] bg-white/70 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-xs hover:bg-white"
        >
          Reveal
        </button>
      )}
    </div>
  );
};
