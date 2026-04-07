import { Ball, Wall, Star, Portal, MovingPlatform, GravityZone, Vec2 } from './types';
import { soundEngine } from './sound';

const DAMPING = 0.975;
const MIN_VEL = 0.3;
const ICE_FRICTION = 0.995;

export function updateBall(
  ball: Ball,
  walls: Wall[],
  stars: Star[],
  portal: Portal,
  movingPlatforms: MovingPlatform[],
  gravityZones: GravityZone[],
  gravity: number,
  canvasW: number,
  canvasH: number,
  dt: number,
  time: number
): { hitPortal: boolean; died: boolean } {
  if (!ball.isLaunched || !ball.isActive) return { hitPortal: false, died: false };

  // Gravity
  ball.vel.y += gravity * dt;

  // Gravity zones
  for (const gz of gravityZones) {
    if (ball.pos.x > gz.x && ball.pos.x < gz.x + gz.w &&
        ball.pos.y > gz.y && ball.pos.y < gz.y + gz.h) {
      ball.vel.x += gz.force.x * dt;
      ball.vel.y += gz.force.y * dt;
    }
  }

  ball.pos.x += ball.vel.x * dt * 60;
  ball.pos.y += ball.vel.y * dt * 60;

  // Trail
  ball.trail.push({ x: ball.pos.x, y: ball.pos.y });
  if (ball.trail.length > 30) ball.trail.shift();

  let died = false;

  // Wall collisions
  for (const w of walls) {
    const col = circleRectCollision(ball, w);
    if (col) {
      if (w.type === 'deadly') {
        died = true;
        soundEngine.death();
        break;
      }
      if (w.type === 'breakable') {
        w.hp = (w.hp || 1) - 1;
        if (w.hp <= 0) {
          w.type = 'deadly'; // mark as removed
          w.x = -9999;
          soundEngine.breakBlock();
        }
      }
      const bounce = w.type === 'bouncy' ? 1.3 : w.type === 'ice' ? 0.98 : 0.7;
      resolveBallWall(ball, w, col, bounce);
      const damp = w.type === 'ice' ? ICE_FRICTION : DAMPING;
      ball.vel.x *= damp;
      ball.vel.y *= damp;
      ball.bounceCount++;
      if (ball.bounceCount >= 3) { died = true; soundEngine.death(); break; }
      if (w.type === 'bouncy') soundEngine.bouncyBounce();
      else soundEngine.bounce();
    }
  }

  // Moving platforms
  for (const mp of movingPlatforms) {
    const offset = Math.sin((time * mp.moveSpeed + (mp.initialOffset || 0)) * 0.001) * mp.moveRange;
    const px = mp.moveAxis === 'x' ? mp.x + offset : mp.x;
    const py = mp.moveAxis === 'y' ? mp.y + offset : mp.y;
    const virtualWall: Wall = { x: px, y: py, w: mp.w, h: mp.h, type: mp.type };
    const col = circleRectCollision(ball, virtualWall);
    if (col) {
      if (mp.type === 'deadly') { died = true; soundEngine.death(); break; }
      const bounce = mp.type === 'bouncy' ? 1.3 : 0.7;
      resolveBallWall(ball, virtualWall, col, bounce);
      ball.vel.x *= DAMPING;
      ball.vel.y *= DAMPING;
      ball.bounceCount++;
      if (ball.bounceCount >= 3) { died = true; soundEngine.death(); break; }
      soundEngine.bounce();
    }
  }

  // Star collection
  for (const s of stars) {
    if (!s.collected) {
      const dx = ball.pos.x - s.x;
      const dy = ball.pos.y - s.y;
      if (Math.sqrt(dx * dx + dy * dy) < ball.radius + s.radius) {
        s.collected = true;
        soundEngine.collectStar();
      }
    }
  }

  // Portal check
  const pdx = ball.pos.x - portal.x;
  const pdy = ball.pos.y - portal.y;
  if (Math.sqrt(pdx * pdx + pdy * pdy) < ball.radius + portal.radius) {
    soundEngine.portalEnter();
    return { hitPortal: true, died: false };
  }

  // Canvas bounds
  if (ball.pos.x - ball.radius < 0) {
    ball.pos.x = ball.radius;
    ball.vel.x = Math.abs(ball.vel.x) * 0.6;
    ball.bounceCount++;
    soundEngine.bounce();
  }
  if (ball.pos.x + ball.radius > canvasW) {
    ball.pos.x = canvasW - ball.radius;
    ball.vel.x = -Math.abs(ball.vel.x) * 0.6;
    ball.bounceCount++;
    soundEngine.bounce();
  }
  if (ball.pos.y - ball.radius < 0) {
    ball.pos.y = ball.radius;
    ball.vel.y = Math.abs(ball.vel.y) * 0.6;
    ball.bounceCount++;
    soundEngine.bounce();
  }
  if (ball.bounceCount >= 4) { died = true; }
  if (ball.pos.y + ball.radius > canvasH) {
    died = true;
  }

  // Slow stop - faster cutoff
  const speed = Math.sqrt(ball.vel.x * ball.vel.x + ball.vel.y * ball.vel.y);
  if (speed < MIN_VEL) {
    ball.vel.x = 0;
    ball.vel.y = 0;
    ball.isActive = false;
  }

  return { hitPortal: false, died };
}

interface CollisionResult {
  normal: Vec2;
  overlap: number;
}

function circleRectCollision(ball: Ball, wall: Wall): CollisionResult | null {
  const cx = Math.max(wall.x, Math.min(ball.pos.x, wall.x + wall.w));
  const cy = Math.max(wall.y, Math.min(ball.pos.y, wall.y + wall.h));
  const dx = ball.pos.x - cx;
  const dy = ball.pos.y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < ball.radius) {
    const nx = dist === 0 ? 0 : dx / dist;
    const ny = dist === 0 ? -1 : dy / dist;
    return { normal: { x: nx, y: ny }, overlap: ball.radius - dist };
  }
  return null;
}

function resolveBallWall(ball: Ball, _wall: Wall, col: CollisionResult, bounce: number) {
  ball.pos.x += col.normal.x * col.overlap;
  ball.pos.y += col.normal.y * col.overlap;
  const dotProduct = ball.vel.x * col.normal.x + ball.vel.y * col.normal.y;
  ball.vel.x = (ball.vel.x - 2 * dotProduct * col.normal.x) * bounce;
  ball.vel.y = (ball.vel.y - 2 * dotProduct * col.normal.y) * bounce;
}
