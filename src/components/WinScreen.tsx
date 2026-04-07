import React from 'react';
import { soundEngine } from '../game/sound';
import { levels } from '../game/levels';

interface WinScreenProps {
  levelId: number;
  starsCollected: number;
  totalStars: number;
  shotsUsed: number;
  maxShots: number;
  score: number;
  onNext: () => void;
  onRetry: () => void;
  onLevels: () => void;
  isLastLevel: boolean;
}

const WinScreen: React.FC<WinScreenProps> = ({
  levelId, starsCollected, totalStars, shotsUsed, maxShots,
  score, onNext, onRetry, onLevels, isLastLevel
}) => {
  const level = levels.find(l => l.id === levelId)!;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="flex flex-col items-center gap-6 animate-bounce-in max-w-sm w-full">
        <div className="text-5xl animate-float">🎉</div>
        <h2 className="text-3xl font-bold text-foreground">Level Complete!</h2>
        <p className="text-muted-foreground">{level.name}</p>

        {/* Stars */}
        <div className="flex gap-3">
          {Array.from({ length: totalStars }).map((_, i) => (
            <span
              key={i}
              className={`text-4xl ${i < starsCollected ? 'star-gold animate-star-pop' : 'star-empty'}`}
              style={{ animationDelay: `${i * 200}ms` }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="w-full bg-card rounded-2xl p-4 game-shadow space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shots Used</span>
            <span className="font-semibold text-foreground">{shotsUsed} / {maxShots}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Stars</span>
            <span className="font-semibold text-game-gold">{starsCollected} / {totalStars}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-border pt-2">
            <span className="text-muted-foreground">Score</span>
            <span className="font-bold text-primary text-lg">{score}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          {!isLastLevel && (
            <button
              onClick={() => { soundEngine.click(); onNext(); }}
              className="game-button w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-2xl game-shadow"
            >
              Next Level →
            </button>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => { soundEngine.click(); onRetry(); }}
              className="game-button flex-1 py-3 bg-secondary text-secondary-foreground font-medium rounded-xl"
            >
              Retry
            </button>
            <button
              onClick={() => { soundEngine.click(); onLevels(); }}
              className="game-button flex-1 py-3 bg-secondary text-secondary-foreground font-medium rounded-xl"
            >
              Levels
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinScreen;
