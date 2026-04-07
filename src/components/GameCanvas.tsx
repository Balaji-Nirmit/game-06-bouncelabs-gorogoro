import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Level, Ball, GameScreen } from '../game/types';
import { updateBall } from '../game/physics';
import { renderGame } from '../game/renderer';
import { soundEngine } from '../game/sound';
import { levels } from '../game/levels';

interface GameCanvasProps {
  levelId: number;
  onWin: (starsCollected: number, shotsUsed: number, maxShots: number, totalStars: number) => void;
  onLose: () => void;
  onBack: () => void;
}

const VIRTUAL_W = 400;
const VIRTUAL_H = 600;

const GameCanvas: React.FC<GameCanvasProps> = ({ levelId, onWin, onLose, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const levelData = useRef<Level>(JSON.parse(JSON.stringify(levels.find(l => l.id === levelId)!)));
  const ballRef = useRef<Ball>({
    pos: { x: levelData.current.cannon.x, y: levelData.current.cannon.y },
    vel: { x: 0, y: 0 },
    radius: 8,
    isLaunched: false,
    isActive: true,
    trail: [],
    bounceCount: 0,
  });

  const [shotsUsed, setShotsUsed] = useState(0);
  const [starsCollected, setStarsCollected] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ w: 400, h: 600 });
  const aimingRef = useRef(false);
  const aimAngleRef = useRef(levelData.current.cannon.angle * (Math.PI / 180));
  const aimPowerRef = useRef(levelData.current.cannon.power);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const shotsRef = useRef(0);
  const gameOverRef = useRef(false);

  const resetBall = useCallback(() => {
    const level = levelData.current;
    ballRef.current = {
      pos: { x: level.cannon.x, y: level.cannon.y },
      vel: { x: 0, y: 0 },
      radius: 8,
      isLaunched: false,
      isActive: true,
      trail: [],
      bounceCount: 0,
    };
    aimAngleRef.current = level.cannon.angle * (Math.PI / 180);
    aimPowerRef.current = level.cannon.power;
    aimingRef.current = false;
  }, []);

  const launchBall = useCallback(() => {
    if (ballRef.current.isLaunched || gameOverRef.current) return;
    if (shotsRef.current >= levelData.current.maxShots) return;
    soundEngine.init();
    soundEngine.launch();
    const angle = aimAngleRef.current;
    const power = aimPowerRef.current;
    ballRef.current.isLaunched = true;
    ballRef.current.vel = {
      x: Math.cos(angle) * power,
      y: Math.sin(angle) * power,
    };
    shotsRef.current += 1;
    setShotsUsed(shotsRef.current);
    aimingRef.current = false;
  }, []);

  // Resize
  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const aspect = VIRTUAL_W / VIRTUAL_H;
      let w = rect.width;
      let h = w / aspect;
      if (h > rect.height) {
        h = rect.height;
        w = h * aspect;
      }
      setCanvasSize({ w: Math.floor(w), h: Math.floor(h) });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOverRef.current) return;
      const ball = ballRef.current;
      if (ball.isLaunched) return;
      const step = 0.05;
      const powerStep = 0.5;
      switch (e.key) {
        case 'ArrowLeft':
          aimAngleRef.current -= step;
          aimingRef.current = true;
          break;
        case 'ArrowRight':
          aimAngleRef.current += step;
          aimingRef.current = true;
          break;
        case 'ArrowUp':
          aimPowerRef.current = Math.min(15, aimPowerRef.current + powerStep);
          aimingRef.current = true;
          break;
        case 'ArrowDown':
          aimPowerRef.current = Math.max(2, aimPowerRef.current - powerStep);
          aimingRef.current = true;
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          launchBall();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [launchBall]);

  // Touch/Mouse controls on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getCanvasPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * VIRTUAL_W,
        y: ((clientY - rect.top) / rect.height) * VIRTUAL_H,
      };
    };

    const handleStart = (cx: number, cy: number) => {
      if (gameOverRef.current) return;
      soundEngine.init();
      const ball = ballRef.current;
      if (ball.isLaunched && !ball.isActive) {
        if (shotsRef.current < levelData.current.maxShots) {
          resetBall();
        }
        return;
      }
      if (!ball.isLaunched) {
        const pos = getCanvasPos(cx, cy);
        touchStartRef.current = pos;
        aimingRef.current = true;
      }
    };

    const handleMove = (cx: number, cy: number) => {
      if (!aimingRef.current || ballRef.current.isLaunched) return;
      const pos = getCanvasPos(cx, cy);
      const cannon = levelData.current.cannon;
      const dx = pos.x - cannon.x;
      const dy = pos.y - cannon.y;
      aimAngleRef.current = Math.atan2(dy, dx);
      const dist = Math.sqrt(dx * dx + dy * dy);
      aimPowerRef.current = Math.min(15, Math.max(2, dist / 20));
    };

    const handleEnd = () => {
      if (aimingRef.current && !ballRef.current.isLaunched) {
        launchBall();
      }
      touchStartRef.current = null;
    };

    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); handleStart(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); handleMove(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchEnd = (e: TouchEvent) => { e.preventDefault(); handleEnd(); };
    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd, { passive: false });
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);

    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
    };
  }, [launchBall, resetBall, canvasSize]);

  // Game loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      timeRef.current = now;

      const canvas = canvasRef.current;
      if (!canvas) { animRef.current = requestAnimationFrame(loop); return; }
      const ctx = canvas.getContext('2d');
      if (!ctx) { animRef.current = requestAnimationFrame(loop); return; }

      const ball = ballRef.current;
      const level = levelData.current;
      const scaleX = canvasSize.w / VIRTUAL_W;
      const scaleY = canvasSize.h / VIRTUAL_H;

      if (ball.isLaunched && ball.isActive && !gameOverRef.current) {
        const result = updateBall(
          ball, level.walls, level.stars, level.portal,
          level.movingPlatforms || [], level.gravityZones || [],
          level.gravity || 0.3, VIRTUAL_W, VIRTUAL_H, dt, now
        );

        const collected = level.stars.filter(s => s.collected).length;
        setStarsCollected(collected);

        if (result.hitPortal) {
          gameOverRef.current = true;
          const totalStars = level.stars.length;
          setTimeout(() => onWin(collected, shotsRef.current, level.maxShots, totalStars), 300);
      } else if (result.died) {
          ball.isActive = false;
          if (shotsRef.current >= level.maxShots) {
            gameOverRef.current = true;
            soundEngine.lose();
            setTimeout(() => onLose(), 400);
          } else {
            // Can retry - instant reset
            resetBall();
          }
        } else if (!ball.isActive) {
          // Ball stopped - auto reset or lose
          if (shotsRef.current >= level.maxShots) {
            gameOverRef.current = true;
            soundEngine.lose();
            setTimeout(() => onLose(), 400);
          } else {
            // Auto-reset for next shot immediately
            resetBall();
          }
        }
      }

      renderGame(
        ctx, canvasSize.w, canvasSize.h, scaleX, scaleY,
        ball, level.walls, level.stars, level.portal, level.cannon,
        level.movingPlatforms || [], level.gravityZones || [],
        aimingRef.current, aimAngleRef.current, aimPowerRef.current, now
      );

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [canvasSize, onWin, onLose, resetBall]);

  const level = levelData.current;

  return (
    <div className="flex flex-col items-center h-full w-full bg-game-bg">
      {/* HUD */}
      <div className="w-full max-w-lg flex items-center justify-between px-4 py-2">
        <button
          onClick={() => { soundEngine.click(); onBack(); }}
          className="game-button px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-xl"
        >
          ← Back
        </button>
        <div className="text-center">
          <div className="text-xs text-muted-foreground font-medium">Level {level.id}</div>
          <div className="text-sm font-semibold text-foreground">{level.name}</div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">
            🎯 {shotsUsed}/{level.maxShots}
          </span>
          <span className="text-game-gold">
            ⭐ {starsCollected}/{level.stars.length}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="flex-1 flex items-center justify-center w-full px-2 pb-2">
        <canvas
          ref={canvasRef}
          width={canvasSize.w}
          height={canvasSize.h}
          className="rounded-2xl game-shadow-lg"
          style={{ width: canvasSize.w, height: canvasSize.h, touchAction: 'none' }}
        />
      </div>

      {/* Mobile controls hint */}
      <div className="w-full max-w-lg px-4 pb-3">
        <div className="text-center text-xs text-muted-foreground">
          <span className="hidden md:inline">Arrow keys to aim • Space to launch • </span>
          <span className="md:hidden">Drag to aim • Release to launch • </span>
          Tap canvas to retry shot
        </div>
      </div>
    </div>
  );
};

export default GameCanvas;
