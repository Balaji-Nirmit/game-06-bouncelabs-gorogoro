import React from 'react';
import { soundEngine } from '../game/sound';

interface MainMenuProps {
  onPlay: () => void;
  totalStars: number;
  totalPossibleStars: number;
}

const MainMenu: React.FC<MainMenuProps> = ({ onPlay, totalStars, totalPossibleStars }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="flex flex-col items-center gap-8 animate-slide-up max-w-sm w-full">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-[1.5rem] bg-primary flex items-center justify-center game-shadow-lg animate-float">
            <span className="text-4xl">🧪</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Bounce Lab
          </h1>
          <p className="text-muted-foreground text-center text-sm leading-relaxed">
            Launch, bounce, and collect stars through 35 physics puzzles
          </p>
        </div>

        {/* Star count */}
        {totalStars > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-2xl">
            <span className="text-game-gold text-lg">⭐</span>
            <span className="text-sm font-semibold text-foreground">{totalStars}</span>
            <span className="text-xs text-muted-foreground">/ {totalPossibleStars}</span>
          </div>
        )}

        {/* Play button */}
        <button
          onClick={() => { soundEngine.init(); soundEngine.click(); onPlay(); }}
          className="game-button w-full py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-2xl game-shadow-lg animate-pulse-glow"
        >
          Play
        </button>

        {/* Sound toggle */}
        <button
          onClick={() => { soundEngine.init(); soundEngine.toggleMute(); soundEngine.click(); }}
          className="game-button px-6 py-2 bg-secondary text-secondary-foreground text-sm rounded-xl"
        >
          {soundEngine.isMuted ? '🔇 Unmute' : '🔊 Sound On'}
        </button>

        {/* Controls info */}
        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">🖥️ Arrow keys + Space</p>
          <p className="text-xs text-muted-foreground">📱 Drag & release to launch</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
