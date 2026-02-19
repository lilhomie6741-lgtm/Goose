
import React, { useEffect, useState, useCallback } from 'react';

const ScorpionIcon = ({ isSquashed }: { isSquashed: boolean }) => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md overflow-visible" xmlns="http://www.w3.org/2000/svg">
    {/* Green Splatter Juice */}
    {isSquashed && (
      <g fill="#4ade80" opacity="0.8">
        <circle cx="30" cy="60" r="8" />
        <circle cx="70" cy="65" r="6" />
        <circle cx="50" cy="75" r="10" />
        <rect x="40" y="55" width="20" height="15" rx="5" />
      </g>
    )}

    {/* Legs */}
    <g stroke="black" strokeWidth="3" strokeLinecap="round">
      {!isSquashed ? (
        <>
          <path d="M40 50 L20 40" className="animate-leg-1" />
          <path d="M40 55 L20 55" className="animate-leg-2" />
          <path d="M40 60 L20 70" className="animate-leg-3" />
          <path d="M40 65 L20 85" className="animate-leg-4" />
          
          <path d="M60 50 L80 40" className="animate-leg-1" />
          <path d="M60 55 L80 55" className="animate-leg-2" />
          <path d="M60 60 L80 70" className="animate-leg-3" />
          <path d="M60 65 L80 85" className="animate-leg-4" />
        </>
      ) : (
        <>
          <path d="M40 60 L10 50" />
          <path d="M40 62 L10 62" />
          <path d="M40 64 L10 75" />
          <path d="M60 60 L90 50" />
          <path d="M60 62 L90 62" />
          <path d="M60 64 L90 75" />
        </>
      )}
    </g>
    
    {/* Body */}
    {!isSquashed ? (
      <ellipse cx="50" cy="60" rx="12" ry="18" fill="#450a0a" stroke="black" strokeWidth="3" />
    ) : (
      <ellipse cx="50" cy="65" rx="25" ry="6" fill="#450a0a" stroke="black" strokeWidth="3" />
    )}
    
    {/* Pincers */}
    {!isSquashed ? (
      <>
        <path d="M42 45 Q 35 30, 25 35" fill="none" stroke="black" strokeWidth="3" />
        <circle cx="25" cy="35" r="5" fill="#7f1d1d" stroke="black" strokeWidth="2" />
        <path d="M58 45 Q 65 30, 75 35" fill="none" stroke="black" strokeWidth="3" />
        <circle cx="75" cy="35" r="5" fill="#7f1d1d" stroke="black" strokeWidth="2" />
      </>
    ) : (
      <>
        <circle cx="20" cy="55" r="4" fill="#7f1d1d" stroke="black" strokeWidth="2" />
        <circle cx="80" cy="55" r="4" fill="#7f1d1d" stroke="black" strokeWidth="2" />
      </>
    )}
    
    {/* Tail */}
    {!isSquashed ? (
      <>
        <path d="M50 78 Q 50 95, 70 90 Q 80 85, 75 75" fill="none" stroke="black" strokeWidth="3" strokeLinejoin="round" />
        <path d="M75 75 L80 70" stroke="black" strokeWidth="3" strokeLinecap="round" />
        <circle cx="75" cy="75" r="3" fill="#ef4444" stroke="black" strokeWidth="1" />
      </>
    ) : (
      <path d="M50 71 L60 85 L75 80" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
    )}

    {/* Eyes */}
    {!isSquashed ? (
      <>
        <circle cx="46" cy="52" r="2" fill="white" />
        <circle cx="54" cy="52" r="2" fill="white" />
      </>
    ) : (
      <>
        <path d="M44 62 L48 66 M48 62 L44 66" stroke="white" strokeWidth="1" />
        <path d="M52 62 L56 66 M56 62 L52 66" stroke="white" strokeWidth="1" />
      </>
    )}

    <style>{`
      .animate-leg-1 { animation: wiggle 0.2s infinite alternate; transform-origin: 40px 50px; }
      .animate-leg-2 { animation: wiggle 0.2s infinite alternate-reverse 0.05s; transform-origin: 40px 55px; }
      .animate-leg-3 { animation: wiggle 0.2s infinite alternate 0.1s; transform-origin: 40px 60px; }
      .animate-leg-4 { animation: wiggle 0.2s infinite alternate-reverse 0.15s; transform-origin: 40px 65px; }
      @keyframes wiggle {
        from { transform: rotate(-5deg); }
        to { transform: rotate(5deg); }
      }
    `}</style>
  </svg>
);

const ScorpionCrawl: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSquashed, setIsSquashed] = useState(false);
  const [position, setPosition] = useState({ y: 50, side: 'left' as 'left' | 'right' });

  const spawnScorpion = useCallback(() => {
    const side = Math.random() > 0.5 ? 'left' : 'right';
    const y = Math.random() * 80 + 10;
    setPosition({ y, side });
    setIsSquashed(false);
    setIsVisible(true);
    
    // Hide after animation finishes (approx 8s) if not squashed
    const timer = setTimeout(() => {
      setIsVisible(prev => {
        // Only hide if it hasn't been squashed (squashed has its own cleanup)
        return false;
      });
    }, 8000);
    return timer;
  }, []);

  useEffect(() => {
    let timer: any;
    const initialTimer = setTimeout(() => {
      timer = spawnScorpion();
    }, 5000);
    
    const interval = setInterval(() => {
      if (!isVisible) {
        timer = spawnScorpion();
      }
    }, 15000 + Math.random() * 20000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isVisible, spawnScorpion]);

  const handleSquash = (e: React.MouseEvent) => {
    if (isSquashed) return;
    e.stopPropagation();
    setIsSquashed(true);
    
    // Play a squish sound if possible
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (err) {}

    // Cleanup after squashing
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed z-[90]"
      style={{
        top: `${position.y}%`,
        left: position.side === 'left' ? '-100px' : 'auto',
        right: position.side === 'right' ? '-100px' : 'auto',
        animation: `${position.side === 'left' ? 'crawl-right' : 'crawl-left'} 8s linear forwards`,
        animationPlayState: isSquashed ? 'paused' : 'running',
        pointerEvents: isSquashed ? 'none' : 'auto'
      }}
    >
      <div 
        className={`cursor-crosshair transition-opacity duration-500 ${position.side === 'right' ? 'scale-x-[-1]' : ''} ${isSquashed ? 'opacity-70' : 'opacity-100'}`}
        onClick={handleSquash}
      >
        <ScorpionIcon isSquashed={isSquashed} />
        <div className={`absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 pixel-border whitespace-nowrap shadow-sm transition-colors ${isSquashed ? 'bg-red-600 text-white' : 'bg-white text-black text-[8px]'}`}>
          {isSquashed ? 'SPLAT!' : 'Hi!'}
        </div>
      </div>
      <style>{`
        @keyframes crawl-right {
          0% { left: -100px; transform: translateY(0); }
          25% { transform: translateY(10px); }
          50% { transform: translateY(-10px); }
          75% { transform: translateY(5px); }
          100% { left: 110%; transform: translateY(0); }
        }
        @keyframes crawl-left {
          0% { right: -100px; transform: translateY(0); }
          25% { transform: translateY(-10px); }
          50% { transform: translateY(10px); }
          75% { transform: translateY(-5px); }
          100% { right: 110%; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ScorpionCrawl;
