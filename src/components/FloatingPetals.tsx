import React, { useMemo } from 'react';

export const FloatingPetals: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 100) / count + (Math.sin(i) * 5)}%`,
      delay: `${(i * 0.7) % 5}s`,
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
          className="absolute opacity-60 animate-petal-fall"
          style={{
            left: petal.left,
            top: '-20px',
            animation: `petalFall ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
            transform: `rotate(${petal.rotation})`,
          }}
        >
          {/* Delicate watercolor rose petal SVG */}
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 2C18 7 28 12 28 20C28 26 21 28 15 28C9 28 2 26 2 20C2 12 12 7 15 2Z"
              fill="url(#petalGradient)"
              opacity="0.85"
            />
            <defs>
              <linearGradient id="petalGradient" x1="15" y1="2" x2="15" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.6" stopColor="#E1EDF5" />
                <stop offset="1" stopColor="#C4DCED" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
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
