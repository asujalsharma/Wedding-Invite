import React, { useMemo } from 'react';

export const FloatingPetals: React.FC<{ count?: number }> = ({ count = 14 }) => {
  const petals = useMemo(() => {
    const types: Array<'rose' | 'marigold' | 'gold'> = ['rose', 'marigold', 'rose', 'gold', 'marigold'];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      type: types[i % types.length],
      left: `${(i * 100) / count + (Math.sin(i) * 5)}%`,
      delay: `${(i * 0.6) % 5}s`,
      duration: `${7 + (i % 5) * 2}s`,
      size: `${14 + (i % 3) * 6}px`,
      rotation: `${(i * 45) % 360}deg`
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-75 animate-petal-fall"
          style={{
            left: petal.left,
            top: '-20px',
            animation: `petalFall ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
            transform: `rotate(${petal.rotation})`,
          }}
        >
          {/* Auspicious Pushpa Vrishti: Rose (Gulab) or Marigold (Genda) or Golden Flake */}
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 2C18 7 28 12 28 20C28 26 21 28 15 28C9 28 2 26 2 20C2 12 12 7 15 2Z"
              fill={`url(#petalGrad-${petal.type})`}
              opacity="0.9"
            />
          </svg>
        </div>
      ))}

      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Auspicious Red / Velvet Rose Petal (Gulab) */}
          <linearGradient id="petalGrad-rose" x1="15" y1="2" x2="15" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFA4B2" />
            <stop offset="0.4" stopColor="#C92A42" />
            <stop offset="1" stopColor="#7E152D" />
          </linearGradient>

          {/* Auspicious Marigold Petal (Genda Phool) */}
          <linearGradient id="petalGrad-marigold" x1="15" y1="2" x2="15" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF08A" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>

          {/* Auspicious 24K Gold Flake */}
          <linearGradient id="petalGrad-gold" x1="15" y1="2" x2="15" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF9E6" />
            <stop offset="0.5" stopColor="#E5C158" />
            <stop offset="1" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(50px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
