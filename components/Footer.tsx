
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t-4 border-red-900 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <span className="text-xl hover:scale-125 transition-transform cursor-pointer">🎮</span>
          <span className="text-xl hover:scale-125 transition-transform cursor-pointer">🕹️</span>
          <span className="text-xl hover:scale-125 transition-transform cursor-pointer">👾</span>
          <span className="text-xl hover:scale-125 transition-transform cursor-pointer">🦢</span>
        </div>
        <p className="text-[10px] text-gray-400 mb-2">
          © 2026 GOOSE GAMES PORTAL
        </p>
        <p className="text-[8px] text-gray-600 uppercase tracking-widest">
          No AI involved • Only Pixel Perfection • Play Responsibly
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-[8px] text-red-500">
          <a href="#" className="hover:text-yellow-400 underline underline-offset-4">TERMS OF SERVICE</a>
          <a href="#" className="hover:text-yellow-400 underline underline-offset-4">PRIVACY POLICY</a>
          <a href="#" className="hover:text-yellow-400 underline underline-offset-4">DMCA</a>
          <a href="#" className="hover:text-yellow-400 underline underline-offset-4">CONTACT US</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
