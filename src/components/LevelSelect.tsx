import React from 'react';
import { levels } from '../game/levels';
import { soundEngine } from '../game/sound';

interface LevelSelectProps {
  onSelectLevel: (id: number) => void;
  onBack: () => void;
  levelScores: Record<number, { stars: number; score: number; completed: boolean }>;
}

const worldNames = ['Basics', 'Momentum', 'Complexity', 'Advanced', 'Expert', 'Bonus'];

const LevelSelect: React.FC<LevelSelectProps> = ({ onSelectLevel, onBack, levelScores }) => {
  const worlds: { name: string; levels: typeof levels }[] = [];
  for (let i = 0; i < levels.length; i += 6) {
    worlds.push({
      name: worldNames[Math.floor(i / 6)] || `World ${Math.floor(i / 6) + 1}`,
      levels: levels.slice(i, i + 6),
    });
  }

  // A level is unlocked if previous level is completed or it's level 1
  const isUnlocked = (id: number) => {
    if (id === 1) return true;
    return !!levelScores[id - 1]?.completed;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button
          onClick={() => { soundEngine.click(); onBack(); }}
          className="game-button px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-xl"
        >
          ← Menu
        </button>
        <h2 className="text-lg font-bold text-foreground">Select Level</h2>
        <div className="w-16" />
      </div>

      {/* Worlds */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 max-w-lg mx-auto w-full">
        {worlds.map((world, wi) => (
          <div key={wi} className="animate-slide-up" style={{ animationDelay: `${wi * 80}ms` }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {world.name}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {world.levels.map((level) => {
                const unlocked = isUnlocked(level.id);
                const score = levelScores[level.id];
                const stars = score?.stars || 0;
                const totalStarsForLevel = level.stars.length;

                return (
                  <button
                    key={level.id}
                    onClick={() => {
                      if (unlocked) {
                        soundEngine.click();
                        onSelectLevel(level.id);
                      }
                    }}
                    disabled={!unlocked}
                    className={`
                      game-button p-3 rounded-2xl flex flex-col items-center gap-1.5
                      ${unlocked
                        ? score?.completed
                          ? 'bg-card game-shadow border border-border'
                          : 'bg-card game-shadow border border-border'
                        : 'bg-muted opacity-50 cursor-not-allowed'
                      }
                    `}
                  >
                    <span className={`text-lg font-bold ${unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {unlocked ? level.id : '🔒'}
                    </span>
                    {unlocked && (
                      <div className="flex gap-0.5">
                        {Array.from({ length: totalStarsForLevel }).map((_, i) => (
                          <span key={i} className={`text-xs ${i < stars ? 'star-gold' : 'star-empty'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                    {unlocked && (
                      <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                        {level.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelect;
