
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPlay: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <div 
      className="bg-black/80 pixel-border pixel-border-hover transition-all flex flex-col h-full group"
      onClick={onPlay}
    >
      <div className="relative aspect-video overflow-hidden border-b-4 border-black">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-black text-[8px] pixel-border">
          {game.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm mb-2 text-yellow-400 line-clamp-1">{game.title}</h3>
        <p className="text-[9px] text-gray-300 mb-4 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
        <button className="mt-auto w-full nes-button pixel-border bg-red-600 text-white text-[10px] font-bold hover:bg-red-500">
          PLAY NOW
        </button>
      </div>
    </div>
  );
};

export default GameCard;
