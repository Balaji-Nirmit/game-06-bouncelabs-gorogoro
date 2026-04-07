import { Ball, Wall, Star, Portal, Cannon, MovingPlatform, GravityZone } from './types';

const COLORS = {
  bg: '#F5F5F7',
  solid: '#1D1D1F',
  bouncy: '#0071E3',
  deadly: '#FF3B30',
  breakable: '#86868B',
  breakable2: '#636366',
  ice: '#5AC8FA',
  ball: '#FF9500',
  ballGlow: 'rgba(255, 149, 0, 0.3)',
  star: '#FFD60A',
  starGlow: 'rgba(255, 214, 10, 0.4)',
  portal: '#30D158',
  portalGlow: 'rgba(48, 209, 88, 0.4)',
  cannon: '#1D1D1F',
  trail: 'rgba(255, 149, 0, 0.15)',
  aimLine: 'rgba(0, 113, 227, 0.5)',
  aimDot: 'rgba(0, 113, 227, 0.8)',
  gravityZone: 'rgba(175, 82, 222, 0.1)',
  gravityBorder: 'rgba(175, 82, 222, 0.3)',
};

export function renderGame(
  ctx: CanvasRenderingContext2D,
  canvasW: number,
  canvasH: number,
  scaleX: number,
  scaleY: number,
  ball: Ball,
  walls: Wall[],
  stars: Star[],
  portal: Portal,
  cannon: Cannon,
  movingPlatforms: MovingPlatform[],
  gravityZones: GravityZone[],
  aiming: boolean,
  aimAngle: number,
  aimPower: number,
  time: number,
) {
  ctx.clearRect(0, 0, canvasW, canvasH);

  // Background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, canvasW, canvasH);

  // Grid dots
  ctx.fillStyle = 'rgba(0,0,0,0.04)';
  const gridSpacing = 30 * scaleX;
  for (let gx = gridSpacing; gx < canvasW; gx += gridSpacing) {
    for (let gy = gridSpacing; gy < canvasH; gy += gridSpacing) {
      ctx.beginPath();
      ctx.arc(gx, gy, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Gravity zones
  for (const gz of gravityZones) {
    ctx.fillStyle = COLORS.gravityZone;
    ctx.strokeStyle = COLORS.gravityBorder;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.fillRect(gz.x * scaleX, gz.y * scaleY, gz.w * scaleX, gz.h * scaleY);
    ctx.strokeRect(gz.x * scaleX, gz.y * scaleY, gz.w * scaleX, gz.h * scaleY);
    ctx.setLineDash([]);

    // Arrow
    const cx = (gz.x + gz.w / 2) * scaleX;
    const cy = (gz.y + gz.h / 2) * scaleY;
    const angle = Math.atan2(gz.force.y, gz.force.x);
    const len = 15 * scaleX;
    ctx.strokeStyle = 'rgba(175, 82, 222, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(angle) * len, cy - Math.sin(angle) * len);
    ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
    ctx.stroke();
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
    ctx.lineTo(cx + Math.cos(angle - 0.5) * len * 0.5, cy + Math.sin(angle - 0.5) * len * 0.5);
    ctx.moveTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
    ctx.lineTo(cx + Math.cos(angle + 0.5) * len * 0.5, cy + Math.sin(angle + 0.5) * len * 0.5);
    ctx.stroke();
  }

  // Walls
  for (const w of walls) {
    if (w.x < -999) continue;
    const rx = w.x * scaleX;
    const ry = w.y * scaleY;
    const rw = w.w * scaleX;
    const rh = w.h * scaleY;
    const r = Math.min(4, rw / 2, rh / 2);

    ctx.beginPath();
    ctx.roundRect(rx, ry, rw, rh, r);

    switch (w.type) {
      case 'solid':
        ctx.fillStyle = COLORS.solid;
        break;
      case 'bouncy':
        ctx.fillStyle = COLORS.bouncy;
        break;
      case 'deadly':
        ctx.fillStyle = COLORS.deadly;
        break;
      case 'breakable':
        ctx.fillStyle = (w.hp || 1) > 1 ? COLORS.breakable2 : COLORS.breakable;
        break;
      case 'ice':
        ctx.fillStyle = COLORS.ice;
        break;
    }
    ctx.fill();

    // Bouncy glow
    if (w.type === 'bouncy') {
      ctx.shadowColor = COLORS.bouncy;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    // Deadly stripes
    if (w.type === 'deadly') {
      ctx.save();
      ctx.clip();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      for (let i = -rw; i < rw + rh; i += 8) {
        ctx.beginPath();
        ctx.moveTo(rx + i, ry);
        ctx.lineTo(rx + i - rh, ry + rh);
        ctx.stroke();
      }
      ctx.restore();
    }
    // Breakable cracks
    if (w.type === 'breakable') {
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(rx + 2, ry + 2, rw - 4, rh - 4);
      ctx.setLineDash([]);
    }
  }

  // Moving platforms
  for (const mp of movingPlatforms) {
    const offset = Math.sin((time * mp.moveSpeed + (mp.initialOffset || 0)) * 0.001) * mp.moveRange;
    const px = (mp.moveAxis === 'x' ? mp.x + offset : mp.x) * scaleX;
    const py = (mp.moveAxis === 'y' ? mp.y + offset : mp.y) * scaleY;
    const pw = mp.w * scaleX;
    const ph = mp.h * scaleY;
    const r = Math.min(4, pw / 2, ph / 2);

    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, r);
    ctx.fillStyle = mp.type === 'deadly' ? COLORS.deadly : mp.type === 'bouncy' ? COLORS.bouncy : COLORS.solid;
    ctx.fill();

    if (mp.type === 'deadly') {
      ctx.save();
      ctx.clip();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;
      for (let i = -pw; i < pw + ph; i += 8) {
        ctx.beginPath();
        ctx.moveTo(px + i, py);
        ctx.lineTo(px + i - ph, py + ph);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  // Portal
  const portalPulse = 1 + Math.sin(time * 0.003) * 0.15;
  const pr = portal.radius * scaleX * portalPulse;
  ctx.beginPath();
  ctx.arc(portal.x * scaleX, portal.y * scaleY, pr * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.portalGlow;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(portal.x * scaleX, portal.y * scaleY, pr, 0, Math.PI * 2);
  const grd = ctx.createRadialGradient(
    portal.x * scaleX, portal.y * scaleY, 0,
    portal.x * scaleX, portal.y * scaleY, pr
  );
  grd.addColorStop(0, '#FFFFFF');
  grd.addColorStop(0.5, COLORS.portal);
  grd.addColorStop(1, 'rgba(48, 209, 88, 0.6)');
  ctx.fillStyle = grd;
  ctx.fill();

  // Stars
  for (const s of stars) {
    if (s.collected) continue;
    const sx = s.x * scaleX;
    const sy = s.y * scaleY;
    const sr = s.radius * scaleX;
    const starPulse = 1 + Math.sin(time * 0.004 + s.x) * 0.1;

    ctx.beginPath();
    ctx.arc(sx, sy, sr * 1.8 * starPulse, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.starGlow;
    ctx.fill();

    drawStar(ctx, sx, sy, sr * starPulse, COLORS.star);
  }

  // Cannon
  const cx = cannon.x * scaleX;
  const cy = cannon.y * scaleY;
  const cLen = 25 * scaleX;
  const cW = 10 * scaleX;
  const angle = aiming ? aimAngle : cannon.angle * (Math.PI / 180);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.fillStyle = COLORS.cannon;
  ctx.beginPath();
  ctx.roundRect(-cW / 2, -cW / 2, cLen, cW, 3);
  ctx.fill();
  ctx.restore();

  // Cannon base
  ctx.beginPath();
  ctx.arc(cx, cy, cW * 0.8, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.cannon;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, cW * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = '#48484A';
  ctx.fill();

  // Aim line
  if (aiming && !ball.isLaunched) {
    const power = aimPower * scaleX;
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = COLORS.aimLine;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * power * 8, cy + Math.sin(angle) * power * 8);
    ctx.stroke();
    ctx.setLineDash([]);

    // Power dots
    for (let i = 1; i <= 5; i++) {
      const dotDist = (power * 8 * i) / 5;
      ctx.beginPath();
      ctx.arc(
        cx + Math.cos(angle) * dotDist,
        cy + Math.sin(angle) * dotDist,
        2 + (i * 0.5),
        0,
        Math.PI * 2
      );
      ctx.fillStyle = COLORS.aimDot;
      ctx.fill();
    }
  }

  // Ball trail
  if (ball.isLaunched) {
    for (let i = 0; i < ball.trail.length - 1; i++) {
      const alpha = i / ball.trail.length;
      ctx.beginPath();
      ctx.arc(ball.trail[i].x * scaleX, ball.trail[i].y * scaleY, ball.radius * scaleX * alpha * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 149, 0, ${alpha * 0.3})`;
      ctx.fill();
    }
  }

  // Ball
  if (ball.isActive || !ball.isLaunched) {
    const bx = ball.isLaunched ? ball.pos.x * scaleX : cx + Math.cos(aiming ? aimAngle : cannon.angle * Math.PI / 180) * cLen * 0.8;
    const by = ball.isLaunched ? ball.pos.y * scaleY : cy + Math.sin(aiming ? aimAngle : cannon.angle * Math.PI / 180) * cLen * 0.8;
    const br = ball.radius * scaleX;

    // Glow
    ctx.beginPath();
    ctx.arc(bx, by, br * 2, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.ballGlow;
    ctx.fill();

    // Ball body
    const ballGrd = ctx.createRadialGradient(bx - br * 0.3, by - br * 0.3, 0, bx, by, br);
    ballGrd.addColorStop(0, '#FFB340');
    ballGrd.addColorStop(1, '#FF9500');
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fillStyle = ballGrd;
    ctx.fill();

    // Highlight
    ctx.beginPath();
    ctx.arc(bx - br * 0.25, by - br * 0.25, br * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fill();

    // Bounce dots indicator (4 dots above ball)
    const maxBounces = 4;
    const remaining = maxBounces - ball.bounceCount;
    const dotR = br * 0.3;
    const dotSpacing = dotR * 3;
    const dotsStartX = bx - ((maxBounces - 1) * dotSpacing) / 2;
    const dotsY = by - br - dotR * 4;
    for (let i = 0; i < maxBounces; i++) {
      ctx.beginPath();
      ctx.arc(dotsStartX + i * dotSpacing, dotsY, dotR, 0, Math.PI * 2);
      if (i < remaining) {
        ctx.fillStyle = COLORS.ball;
        ctx.globalAlpha = 0.9;
      } else {
        ctx.fillStyle = '#86868B';
        ctx.globalAlpha = 0.25;
      }
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 1;
  ctx.stroke();
}
