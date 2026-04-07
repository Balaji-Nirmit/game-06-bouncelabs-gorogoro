import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import MainMenu from '../components/MainMenu';
import LevelSelect from '../components/LevelSelect';
import GameCanvas from '../components/GameCanvas';
import WinScreen from '../components/WinScreen';
import LoseScreen from '../components/LoseScreen';
import { levels } from '../game/levels';
import { soundEngine } from '../game/sound';
import { GameScreen } from '../game/types';

const STORAGE_KEY = 'bouncelab_scores';

function loadScores(): Record<number, { stars: number; score: number; completed: boolean }> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch { return {}; }
}

function saveScores(scores: Record<number, { stars: number; score: number; completed: boolean }>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

function calcScore(starsCollected: number, totalStars: number, shotsUsed: number, maxShots: number): number {
  const starBonus = starsCollected * 100;
  const shotBonus = Math.max(0, (maxShots - shotsUsed)) * 50;
  const perfectBonus = starsCollected === totalStars ? 200 : 0;
  return starBonus + shotBonus + perfectBonus;
}

const totalPossibleStars = levels.reduce((sum, l) => sum + l.stars.length, 0);

const Index: React.FC = () => {
  const [screen, setScreen] = useState<GameScreen>('menu');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelScores, setLevelScores] = useState(loadScores);
  const [lastWinData, setLastWinData] = useState({ starsCollected: 0, totalStars: 0, shotsUsed: 0, maxShots: 0, score: 0 });
  const [gameKey, setGameKey] = useState(0);

  const totalStarsEarned = Object.values(levelScores).reduce((s, v) => s + v.stars, 0);

  const handleWin = useCallback((starsCollected: number, shotsUsed: number, maxShots: number, totalStars: number) => {
    soundEngine.win();
    const score = calcScore(starsCollected, totalStars, shotsUsed, maxShots);
    setLastWinData({ starsCollected, totalStars, shotsUsed, maxShots, score });

    setLevelScores(prev => {
      const existing = prev[currentLevel];
      const newScores = {
        ...prev,
        [currentLevel]: {
          stars: Math.max(existing?.stars || 0, starsCollected),
          score: Math.max(existing?.score || 0, score),
          completed: true,
        },
      };
      saveScores(newScores);
      return newScores;
    });
    setScreen('win');
  }, [currentLevel]);

  const handleLose = useCallback(() => {
    setScreen('lose');
  }, []);

  const playLevel = (id: number) => {
    setCurrentLevel(id);
    setGameKey(k => k + 1);
    setScreen('playing');
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Bounce Lab - Physics Puzzle Game",
    "description": "Launch, bounce, and solve 35 physics puzzles. Collect stars, master gravity, and beat every level in this addictive browser game.",
    "genre": "Puzzle",
    "gamePlatform": "Web Browser",
    "numberOfLevels": 35,
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  };

  return (
    <>
      <Helmet>
        <title>Bounce Lab - Free Physics Puzzle Game | 35 Levels</title>
        <meta name="description" content="Play Bounce Lab, a free physics puzzle game with 35 levels. Launch balls, collect stars, and master gravity in this addictive browser game. Works on mobile and desktop!" />
        <meta name="keywords" content="physics game, puzzle game, bounce game, free browser game, mobile game, ball game, gravity game" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta property="og:title" content="Bounce Lab - Free Physics Puzzle Game" />
        <meta property="og:description" content="35 physics puzzles with stars, gravity zones, and bouncy walls. Play free in your browser!" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={window.location.origin} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {screen === 'menu' && (
        <MainMenu
          onPlay={() => setScreen('levels')}
          totalStars={totalStarsEarned}
          totalPossibleStars={totalPossibleStars}
        />
      )}

      {screen === 'levels' && (
        <LevelSelect
          onSelectLevel={playLevel}
          onBack={() => setScreen('menu')}
          levelScores={levelScores}
        />
      )}

      {screen === 'playing' && (
        <div className="h-screen w-screen overflow-hidden">
          <GameCanvas
            key={gameKey}
            levelId={currentLevel}
            onWin={handleWin}
            onLose={handleLose}
            onBack={() => setScreen('levels')}
          />
        </div>
      )}

      {screen === 'win' && (
        <WinScreen
          levelId={currentLevel}
          starsCollected={lastWinData.starsCollected}
          totalStars={lastWinData.totalStars}
          shotsUsed={lastWinData.shotsUsed}
          maxShots={lastWinData.maxShots}
          score={lastWinData.score}
          onNext={() => playLevel(currentLevel + 1)}
          onRetry={() => playLevel(currentLevel)}
          onLevels={() => setScreen('levels')}
          isLastLevel={currentLevel >= levels.length}
        />
      )}

      {screen === 'lose' && (
        <LoseScreen
          levelId={currentLevel}
          onRetry={() => playLevel(currentLevel)}
          onLevels={() => setScreen('levels')}
        />
      )}
    </>
  );
};

export default Index;
