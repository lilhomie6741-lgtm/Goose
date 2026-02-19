
import React, { useState, useMemo, useCallback } from 'react';
import { GAMES_DATA, CATEGORIES } from './constants';
import { GameCategory } from './types';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import Footer from './components/Footer';
import GooseStampede from './components/GooseStampede';
import ScorpionCrawl from './components/ScorpionCrawl';

const App: React.FC = () => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'ALL'>('ALL');
  const [isStampeding, setIsStampeding] = useState(false);

  const playHonk = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playCutePeep = (startTime: number, freq: number, volume: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        // Triangle wave for a softer, cuter sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        // Slight pitch slide upwards for "cuteness"
        osc.frequency.exponentialRampToValueAtTime(freq * 1.1, startTime + 0.1);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(freq * 2, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.15);
      };

      const now = audioCtx.currentTime;
      // High pitched cute "peep-honk"
      playCutePeep(now, 750, 0.2);
      playCutePeep(now + 0.08, 850, 0.15);

    } catch (e) {
      console.warn("Audio context failed", e);
    }
  }, []);

  const handleHonk = useCallback(() => {
    setIsStampeding(true);
    playHonk();
  }, [playHonk]);

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const activeGame = useMemo(() => 
    GAMES_DATA.find(g => g.id === activeGameId) || null,
  [activeGameId]);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Early Release Sign */}
      <div className="fixed top-6 -right-12 rotate-45 bg-yellow-400 text-black px-12 py-1 z-[60] pixel-border text-[8px] font-bold shadow-lg pointer-events-none whitespace-nowrap">
        EARLY RELEASE
      </div>

      <ScorpionCrawl />

      {isStampeding && <GooseStampede onComplete={() => setIsStampeding(false)} />}
      
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onHonk={handleHonk}
        onLogoClick={() => {
          setActiveGameId(null);
          setSelectedCategory('ALL');
          setSearchQuery('');
        }}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {!activeGameId ? (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`nes-button pixel-border text-[10px] sm:text-xs ${selectedCategory === 'ALL' ? 'bg-yellow-400' : 'bg-white'}`}
              >
                ALL
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`nes-button pixel-border text-[10px] sm:text-xs ${selectedCategory === cat ? 'bg-yellow-400' : 'bg-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredGames.map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onPlay={() => setActiveGameId(game.id)} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-black/50 pixel-border p-8">
                <p className="text-xl">NO GAMES FOUND!</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('ALL');}}
                  className="mt-4 nes-button pixel-border text-xs bg-red-600 text-white"
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </>
        ) : (
          <GamePlayer 
            game={activeGame!} 
            onBack={() => setActiveGameId(null)} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
