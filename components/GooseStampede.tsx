
import React, { useEffect, useState } from 'react';

interface GooseInstance {
  id: number;
  top: number;
  speed: number;
  delay: number;
  scale: number;
  direction: 'left' | 'right';
}

const DrawnGoose = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`w-16 h-16 ${direction === 'left' ? 'scale-x-[-1]' : ''}`} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M25 80 C 15 80, 10 65, 15 50 C 20 35, 45 35, 55 45 C 60 35, 65 15, 80 15 C 90 15, 95 25, 90 35 C 85 45, 70 50, 60 55 C 55 65, 50 85, 25 80 Z" 
      fill="white" 
      stroke="black" 
      strokeWidth="4"
    />
    <path d="M92 32 L98 28 C 100 28, 100 35, 95 38 L90 35" fill="#fb923c" stroke="black" strokeWidth="2" />
    <circle cx="82" cy="28" r="3" fill="black" />
  </svg>
);

const GooseStampede: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [geese, setGeese] = useState<GooseInstance[]>([]);

  useEffect(() => {
    const newGeese: GooseInstance[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: Math.random() * 80 + 10,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 2,
      scale: 0.5 + Math.random() * 1,
      direction: Math.random() > 0.5 ? 'left' : 'right'
    }));
    setGeese(newGeese);

    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {geese.map((goose) => (
        <div
          key={goose.id}
          className="absolute"
          style={{
            top: `${goose.top}%`,
            left: goose.direction === 'right' ? '-100px' : 'calc(100% + 100px)',
            transform: `scale(${goose.scale})`,
            animation: `stampede-${goose.direction} ${goose.speed}s linear ${goose.delay}s forwards`
          }}
        >
          <DrawnGoose direction={goose.direction} />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] px-2 py-1 pixel-border whitespace-nowrap">
            HONK!
          </div>
        </div>
      ))}
      <style>{`
        @keyframes stampede-right {
          from { left: -150px; }
          to { left: 110%; }
        }
        @keyframes stampede-left {
          from { left: 110%; }
          to { left: -150px; }
        }
      `}</style>
    </div>
  );
};

export default GooseStampede;
