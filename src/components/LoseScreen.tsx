import React from 'react';
import { soundEngine } from '../game/sound';
import { levels } from '../game/levels';

interface LoseScreenProps {
  levelId: number;
  onRetry: () => void;
  onLevels: () => void;
}

const LoseScreen: React.FC<LoseScreenProps> = ({ levelId, onRetry, onLevels }) => {
  const level = levels.find(l => l.id === levelId)!;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="flex flex-col items-center gap-6 animate-slide-up max-w-sm w-full">
        <div className="text-5xl">😵</div>
        <h2 className="text-3xl font-bold text-foreground">Out of Shots!</h2>
        <p className="text-muted-foreground">{level.name}</p>
        <p className="text-sm text-muted-foreground text-center">
          You need to reach the green portal to complete the level. Try a different angle or power!
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => { soundEngine.click(); onRetry(); }}
            className="game-button w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-2xl game-shadow"
          >
            Try Again
          </button>
          <button
            onClick={() => { soundEngine.click(); onLevels(); }}
            className="game-button w-full py-3 bg-secondary text-secondary-foreground font-medium rounded-xl"
          >
            Level Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoseScreen;
