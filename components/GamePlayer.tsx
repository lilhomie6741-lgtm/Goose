
import React, { useState } from 'react';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game;
  onBack: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="nes-button pixel-border bg-gray-200 text-black text-[10px]"
        >
          &lt; GO BACK
        </button>
        <h2 className="text-lg text-yellow-400">{game.title}</h2>
        <div className="hidden sm:block text-[8px] text-gray-300">
          {game.category}
        </div>
      </div>

      <div className="relative w-full aspect-video md:aspect-auto md:h-[70vh] bg-black pixel-border overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent animate-spin mb-4"></div>
            <p className="text-xs animate-pulse">LOADING {game.title.toUpperCase()}...</p>
            <p className="text-[8px] mt-2 text-gray-500">HONK! HONK!</p>
          </div>
        )}
        <iframe
          src={game.url}
          className="w-full h-full"
          frameBorder="0"
          onLoad={() => setIsLoading(false)}
          allowFullScreen
          title={game.title}
        ></iframe>
      </div>

      <div className="bg-black/60 pixel-border p-4">
        <h4 className="text-xs text-yellow-400 mb-2">ABOUT THE GAME</h4>
        <p className="text-[10px] leading-relaxed text-gray-200">
          {game.description}
        </p>
        <div className="mt-4 flex gap-2">
          <span className="px-2 py-1 bg-red-900/50 text-[8px] border border-red-600">UNBLOCKED</span>
          <span className="px-2 py-1 bg-red-900/50 text-[8px] border border-red-600">FULLSCREEN SUPPORT</span>
          <span className="px-2 py-1 bg-red-900/50 text-[8px] border border-red-600">FREE TO PLAY</span>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;
