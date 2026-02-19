
import React from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onLogoClick: () => void;
  onHonk: () => void;
}

const GooseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body & Neck - Hand-drawn feel with slightly irregular curves */}
    <path 
      d="M25 80 C 15 80, 10 65, 15 50 C 20 35, 45 35, 55 45 C 60 35, 65 15, 80 15 C 90 15, 95 25, 90 35 C 85 45, 70 50, 60 55 C 55 65, 50 85, 25 80 Z" 
      fill="white" 
      stroke="black" 
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Beak */}
    <path 
      d="M92 32 L98 28 C 100 28, 100 35, 95 38 L90 35" 
      fill="#fb923c" 
      stroke="black" 
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Eye */}
    <circle cx="82" cy="28" r="2.5" fill="black" />
    {/* Wing Line */}
    <path 
      d="M30 60 Q 40 55, 45 65" 
      stroke="black" 
      strokeWidth="2" 
      strokeLinecap="round" 
      opacity="0.3"
    />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onLogoClick, onHonk }) => {
  return (
    <header className="bg-black border-b-4 border-red-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={onLogoClick}
          className="cursor-pointer group flex items-center gap-4"
        >
          <div className="w-14 h-14 bg-white pixel-border flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
             <GooseIcon />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter text-yellow-400 drop-shadow-[2px_2px_0px_rgba(220,38,38,1)]">
            GOOSE GAMES
          </h1>
        </div>

        {/* Tools */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={onHonk}
            className="nes-button pixel-border bg-red-600 text-white text-[10px] font-bold hover:bg-red-500 whitespace-nowrap"
          >
            HONK!
          </button>
          
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH..."
              className="w-full md:w-48 px-4 py-3 bg-white text-black text-[10px] pixel-border focus:outline-none focus:ring-0 placeholder:text-gray-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none text-[10px]">
              🔍
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
