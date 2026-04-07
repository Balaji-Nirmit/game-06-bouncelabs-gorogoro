import { Level } from './types';

// All positions are in a 400x600 virtual coordinate space, scaled to canvas
const W = 400;
const H = 600;

export const levels: Level[] = [
  // === WORLD 1: BASICS (1-6) ===
  {
    id: 1, name: "First Launch", maxShots: 2, par: 1, gravity: 0.3,
    cannon: { x: 60, y: 500, angle: -45, power: 8 },
    portal: { x: 340, y: 100, radius: 18 },
    stars: [{ x: 200, y: 300, collected: false, radius: 12 }],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 250, y: 350, w: 15, h: 210, type: 'solid' },
    ],
  },
  {
    id: 2, name: "Over the Wall", maxShots: 2, par: 1, gravity: 0.3,
    cannon: { x: 60, y: 500, angle: -50, power: 9 },
    portal: { x: 340, y: 480, radius: 18 },
    stars: [
      { x: 200, y: 200, collected: false, radius: 12 },
      { x: 300, y: 350, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 180, y: 280, w: 20, h: 280, type: 'solid' },
      { x: 280, y: 200, w: 120, h: 10, type: 'deadly' },
    ],
  },
  {
    id: 3, name: "Bouncy Fun", maxShots: 2, par: 1, gravity: 0.35,
    cannon: { x: 30, y: 500, angle: -45, power: 8 },
    portal: { x: 350, y: 80, radius: 18 },
    stars: [
      { x: 350, y: 300, collected: false, radius: 12 },
      { x: 60, y: 150, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 100, y: 350, w: 200, h: 15, type: 'bouncy' },
      { x: 250, y: 200, w: 150, h: 15, type: 'bouncy' },
      { x: 180, y: 130, w: 80, h: 10, type: 'bouncy' },
    ],
  },
  {
    id: 4, name: "Watch Out!", maxShots: 2, par: 1, gravity: 0.3,
    cannon: { x: 60, y: 500, angle: -60, power: 9 },
    portal: { x: 340, y: 480, radius: 18 },
    stars: [
      { x: 200, y: 250, collected: false, radius: 12 },
      { x: 100, y: 400, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 130, y: 320, w: 140, h: 15, type: 'deadly' },
      { x: 200, y: 150, w: 15, h: 170, type: 'solid' },
      { x: 300, y: 400, w: 100, h: 10, type: 'deadly' },
    ],
  },
  {
    id: 5, name: "Tight Squeeze", maxShots: 3, par: 1, gravity: 0.3,
    cannon: { x: 50, y: 520, angle: -70, power: 10 },
    portal: { x: 350, y: 520, radius: 18 },
    stars: [
      { x: 200, y: 100, collected: false, radius: 12 },
      { x: 350, y: 250, collected: false, radius: 12 },
      { x: 200, y: 400, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 120, y: 200, w: 15, h: 200, type: 'solid' },
      { x: 280, y: 160, w: 15, h: 200, type: 'solid' },
      { x: 120, y: 200, w: 175, h: 15, type: 'solid' },
    ],
  },
  {
    id: 6, name: "Breakout", maxShots: 3, par: 2, gravity: 0.3,
    cannon: { x: 60, y: 500, angle: -50, power: 9 },
    portal: { x: 340, y: 100, radius: 18 },
    stars: [
      { x: 200, y: 300, collected: false, radius: 12 },
      { x: 300, y: 200, collected: false, radius: 12 },
      { x: 100, y: 150, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 80, y: 250, w: 240, h: 20, type: 'breakable', hp: 2 },
      { x: 150, y: 150, w: 100, h: 20, type: 'breakable', hp: 1 },
      { x: 0, y: 180, w: 80, h: 10, type: 'deadly' },
      { x: 320, y: 180, w: 80, h: 10, type: 'deadly' },
    ],
  },

  // === WORLD 2: MOMENTUM (7-12) ===
  {
    id: 7, name: "Pinball Path", maxShots: 3, par: 1, gravity: 0.35,
    cannon: { x: 50, y: 100, angle: 20, power: 7 },
    portal: { x: 50, y: 520, radius: 18 },
    stars: [
      { x: 350, y: 150, collected: false, radius: 12 },
      { x: 50, y: 300, collected: false, radius: 12 },
      { x: 350, y: 450, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 250, y: 100, w: 150, h: 15, type: 'bouncy' },
      { x: 0, y: 220, w: 100, h: 15, type: 'bouncy' },
      { x: 250, y: 360, w: 150, h: 15, type: 'bouncy' },
      { x: 0, y: 460, w: 150, h: 15, type: 'bouncy' },
    ],
  },
  {
    id: 8, name: "Gravity Well", maxShots: 3, par: 1, gravity: 0.2,
    cannon: { x: 60, y: 500, angle: -80, power: 12 },
    portal: { x: 340, y: 500, radius: 20 },
    stars: [
      { x: 200, y: 100, collected: false, radius: 12 },
      { x: 200, y: 300, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
    ],
    gravityZones: [
      { x: 150, y: 200, w: 100, h: 100, force: { x: 3, y: 0 } },
    ],
  },
  {
    id: 9, name: "Moving Target", maxShots: 3, par: 1, gravity: 0.35,
    cannon: { x: 60, y: 500, angle: -55, power: 8 },
    portal: { x: 340, y: 100, radius: 18 },
    stars: [
      { x: 200, y: 350, collected: false, radius: 12 },
      { x: 100, y: 200, collected: false, radius: 12 },
      { x: 300, y: 250, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 150, y: 150, w: 100, h: 8, type: 'deadly' },
    ],
    movingPlatforms: [
      { x: 80, y: 400, w: 100, h: 15, type: 'solid', moveAxis: 'x', moveRange: 120, moveSpeed: 3 },
      { x: 200, y: 250, w: 100, h: 15, type: 'bouncy', moveAxis: 'x', moveRange: 80, moveSpeed: 4 },
      { x: 50, y: 150, w: 60, h: 12, type: 'deadly', moveAxis: 'y', moveRange: 50, moveSpeed: 2.5 },
    ],
  },
  {
    id: 10, name: "Ice Slide", maxShots: 3, par: 1, gravity: 0.3,
    cannon: { x: 50, y: 100, angle: 30, power: 6 },
    portal: { x: 350, y: 520, radius: 18 },
    stars: [
      { x: 200, y: 250, collected: false, radius: 12 },
      { x: 350, y: 150, collected: false, radius: 12 },
      { x: 50, y: 400, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 50, y: 180, w: 300, h: 15, type: 'ice' },
      { x: 50, y: 320, w: 300, h: 15, type: 'ice' },
      { x: 50, y: 460, w: 300, h: 15, type: 'ice' },
    ],
  },
  {
    id: 11, name: "Danger Zone", maxShots: 3, par: 1, gravity: 0.3,
    cannon: { x: 50, y: 520, angle: -60, power: 9 },
    portal: { x: 350, y: 80, radius: 18 },
    stars: [
      { x: 200, y: 300, collected: false, radius: 12 },
      { x: 300, y: 150, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 0, y: 400, w: 160, h: 12, type: 'deadly' },
      { x: 240, y: 400, w: 160, h: 12, type: 'deadly' },
      { x: 100, y: 250, w: 200, h: 12, type: 'deadly' },
      { x: 160, y: 400, w: 80, h: 12, type: 'bouncy' },
      { x: 60, y: 250, w: 40, h: 12, type: 'bouncy' },
    ],
  },
  {
    id: 12, name: "The Funnel", maxShots: 3, par: 1, gravity: 0.3,
    cannon: { x: 200, y: 80, angle: 90, power: 5 },
    portal: { x: 200, y: 520, radius: 18 },
    stars: [
      { x: 100, y: 200, collected: false, radius: 12 },
      { x: 300, y: 200, collected: false, radius: 12 },
      { x: 200, y: 400, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 170, h: 40, type: 'solid' },
      { x: 230, y: 560, w: 170, h: 40, type: 'solid' },
      { x: 50, y: 150, w: 15, h: 200, type: 'solid' },
      { x: 335, y: 150, w: 15, h: 200, type: 'solid' },
      { x: 100, y: 350, w: 15, h: 150, type: 'solid' },
      { x: 285, y: 350, w: 15, h: 150, type: 'solid' },
    ],
  },

  // === WORLD 3: COMPLEXITY (13-18) ===
  {
    id: 13, name: "Zigzag", maxShots: 4, par: 2, gravity: 0.3,
    cannon: { x: 50, y: 520, angle: -70, power: 10 },
    portal: { x: 350, y: 80, radius: 18 },
    stars: [
      { x: 350, y: 450, collected: false, radius: 12 },
      { x: 50, y: 300, collected: false, radius: 12 },
      { x: 350, y: 200, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 100, y: 470, w: 300, h: 15, type: 'solid' },
      { x: 0, y: 370, w: 300, h: 15, type: 'solid' },
      { x: 100, y: 270, w: 300, h: 15, type: 'solid' },
      { x: 0, y: 170, w: 300, h: 15, type: 'solid' },
    ],
  },
  {
    id: 14, name: "Bounce Chamber", maxShots: 3, par: 1, gravity: 0.25,
    cannon: { x: 50, y: 300, angle: 0, power: 8 },
    portal: { x: 350, y: 300, radius: 18 },
    stars: [
      { x: 200, y: 100, collected: false, radius: 12 },
      { x: 200, y: 500, collected: false, radius: 12 },
      { x: 200, y: 300, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'bouncy' },
      { x: 0, y: 0, w: 400, h: 15, type: 'bouncy' },
      { x: 130, y: 200, w: 15, h: 200, type: 'solid' },
      { x: 255, y: 200, w: 15, h: 200, type: 'solid' },
    ],
  },
  {
    id: 15, name: "Wind Tunnel", maxShots: 3, par: 1, gravity: 0.2,
    cannon: { x: 50, y: 500, angle: -80, power: 11 },
    portal: { x: 350, y: 500, radius: 18 },
    stars: [
      { x: 200, y: 100, collected: false, radius: 12 },
      { x: 50, y: 250, collected: false, radius: 12 },
      { x: 350, y: 250, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
    ],
    gravityZones: [
      { x: 0, y: 50, w: 400, h: 150, force: { x: 5, y: -0.3 } },
      { x: 0, y: 200, w: 400, h: 150, force: { x: -5, y: 0 } },
    ],
  },
  {
    id: 16, name: "Elevator Shaft", maxShots: 4, par: 2, gravity: 0.3,
    cannon: { x: 200, y: 520, angle: -90, power: 10 },
    portal: { x: 200, y: 60, radius: 18 },
    stars: [
      { x: 100, y: 400, collected: false, radius: 12 },
      { x: 300, y: 250, collected: false, radius: 12 },
      { x: 100, y: 150, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 50, y: 0, w: 15, h: 600, type: 'solid' },
      { x: 335, y: 0, w: 15, h: 600, type: 'solid' },
    ],
    movingPlatforms: [
      { x: 65, y: 450, w: 120, h: 15, type: 'bouncy', moveAxis: 'y', moveRange: 60, moveSpeed: 2 },
      { x: 215, y: 300, w: 120, h: 15, type: 'bouncy', moveAxis: 'y', moveRange: 60, moveSpeed: 2.5, initialOffset: 1 },
      { x: 65, y: 180, w: 120, h: 15, type: 'bouncy', moveAxis: 'y', moveRange: 50, moveSpeed: 3 },
    ],
  },
  {
    id: 17, name: "Death Corridor", maxShots: 3, par: 1, gravity: 0.3,
    cannon: { x: 50, y: 300, angle: 0, power: 7 },
    portal: { x: 350, y: 300, radius: 18 },
    stars: [
      { x: 130, y: 300, collected: false, radius: 10 },
      { x: 230, y: 300, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 240, w: 400, h: 10, type: 'deadly' },
      { x: 0, y: 360, w: 400, h: 10, type: 'deadly' },
      { x: 170, y: 260, w: 10, h: 90, type: 'solid' },
      { x: 170, y: 260, w: 60, h: 10, type: 'breakable', hp: 1 },
    ],
  },
  {
    id: 18, name: "Three Star Heist", maxShots: 5, par: 3, gravity: 0.3,
    cannon: { x: 200, y: 520, angle: -90, power: 8 },
    portal: { x: 200, y: 300, radius: 16 },
    stars: [
      { x: 60, y: 80, collected: false, radius: 12 },
      { x: 340, y: 80, collected: false, radius: 12 },
      { x: 200, y: 80, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 0, y: 120, w: 400, h: 15, type: 'solid' },
      { x: 80, y: 0, w: 10, h: 120, type: 'solid' },
      { x: 310, y: 0, w: 10, h: 120, type: 'solid' },
      { x: 150, y: 280, w: 100, h: 60, type: 'solid' },
    ],
  },

  // === WORLD 4: ADVANCED (19-24) ===
  {
    id: 19, name: "Gravity Flip", maxShots: 3, par: 1, gravity: 0.15,
    cannon: { x: 50, y: 300, angle: -30, power: 8 },
    portal: { x: 350, y: 300, radius: 18 },
    stars: [
      { x: 200, y: 100, collected: false, radius: 12 },
      { x: 200, y: 500, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'bouncy' },
      { x: 0, y: 0, w: 400, h: 15, type: 'bouncy' },
    ],
    gravityZones: [
      { x: 0, y: 0, w: 200, h: 300, force: { x: 0, y: 0.5 } },
      { x: 200, y: 300, w: 200, h: 300, force: { x: 0, y: -0.8 } },
    ],
  },
  {
    id: 20, name: "Maze Runner", maxShots: 4, par: 2, gravity: 0.3,
    cannon: { x: 30, y: 30, angle: 90, power: 6 },
    portal: { x: 370, y: 550, radius: 16 },
    stars: [
      { x: 350, y: 100, collected: false, radius: 10 },
      { x: 50, y: 350, collected: false, radius: 10 },
      { x: 350, y: 350, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 560, w: 350, h: 40, type: 'solid' },
      { x: 80, y: 60, w: 15, h: 200, type: 'solid' },
      { x: 80, y: 60, w: 240, h: 15, type: 'solid' },
      { x: 160, y: 180, w: 15, h: 200, type: 'solid' },
      { x: 0, y: 180, w: 160, h: 15, type: 'solid' },
      { x: 240, y: 180, w: 15, h: 250, type: 'solid' },
      { x: 240, y: 430, w: 160, h: 15, type: 'solid' },
      { x: 80, y: 320, w: 160, h: 15, type: 'solid' },
      { x: 0, y: 460, w: 240, h: 15, type: 'solid' },
    ],
  },
  {
    id: 21, name: "Demolition", maxShots: 4, par: 2, gravity: 0.3,
    cannon: { x: 50, y: 500, angle: -45, power: 10 },
    portal: { x: 340, y: 520, radius: 18 },
    stars: [
      { x: 200, y: 200, collected: false, radius: 12 },
      { x: 280, y: 350, collected: false, radius: 12 },
      { x: 200, y: 450, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 150, y: 150, w: 100, h: 20, type: 'breakable', hp: 1 },
      { x: 150, y: 250, w: 100, h: 20, type: 'breakable', hp: 1 },
      { x: 150, y: 350, w: 100, h: 20, type: 'breakable', hp: 2 },
      { x: 150, y: 150, w: 20, h: 220, type: 'breakable', hp: 1 },
      { x: 230, y: 150, w: 20, h: 220, type: 'breakable', hp: 1 },
      { x: 260, y: 300, w: 140, h: 15, type: 'solid' },
    ],
  },
  {
    id: 22, name: "Spinner", maxShots: 3, par: 1, gravity: 0.3,
    cannon: { x: 50, y: 520, angle: -50, power: 8 },
    portal: { x: 350, y: 100, radius: 18 },
    stars: [
      { x: 200, y: 300, collected: false, radius: 12 },
      { x: 300, y: 400, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
    ],
    movingPlatforms: [
      { x: 100, y: 450, w: 100, h: 12, type: 'bouncy', moveAxis: 'x', moveRange: 120, moveSpeed: 3 },
      { x: 180, y: 300, w: 100, h: 12, type: 'deadly', moveAxis: 'x', moveRange: 80, moveSpeed: 4 },
      { x: 150, y: 180, w: 120, h: 12, type: 'bouncy', moveAxis: 'x', moveRange: 60, moveSpeed: 2 },
    ],
  },
  {
    id: 23, name: "Anti-Gravity", maxShots: 3, par: 1, gravity: -0.15,
    cannon: { x: 200, y: 520, angle: -90, power: 6 },
    portal: { x: 200, y: 50, radius: 20 },
    stars: [
      { x: 100, y: 300, collected: false, radius: 12 },
      { x: 300, y: 300, collected: false, radius: 12 },
      { x: 200, y: 200, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 0, y: 0, w: 400, h: 15, type: 'solid' },
      { x: 50, y: 250, w: 120, h: 12, type: 'solid' },
      { x: 230, y: 250, w: 120, h: 12, type: 'solid' },
      { x: 150, y: 350, w: 100, h: 12, type: 'deadly' },
    ],
  },
  {
    id: 24, name: "Combo Breaker", maxShots: 5, par: 3, gravity: 0.3,
    cannon: { x: 50, y: 300, angle: -20, power: 7 },
    portal: { x: 350, y: 300, radius: 16 },
    stars: [
      { x: 150, y: 150, collected: false, radius: 10 },
      { x: 250, y: 450, collected: false, radius: 10 },
      { x: 200, y: 300, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 0, y: 0, w: 400, h: 15, type: 'solid' },
      { x: 120, y: 120, w: 80, h: 15, type: 'breakable', hp: 1 },
      { x: 200, y: 120, w: 15, h: 360, type: 'breakable', hp: 2 },
      { x: 120, y: 420, w: 80, h: 15, type: 'breakable', hp: 1 },
      { x: 280, y: 200, w: 15, h: 200, type: 'solid' },
    ],
    movingPlatforms: [
      { x: 100, y: 250, w: 80, h: 12, type: 'deadly', moveAxis: 'y', moveRange: 60, moveSpeed: 2 },
    ],
  },

  // === WORLD 5: EXPERT (25-30) ===
  {
    id: 25, name: "Vortex", maxShots: 3, par: 1, gravity: 0.1,
    cannon: { x: 50, y: 300, angle: 0, power: 5 },
    portal: { x: 350, y: 300, radius: 16 },
    stars: [
      { x: 200, y: 150, collected: false, radius: 10 },
      { x: 200, y: 450, collected: false, radius: 10 },
      { x: 200, y: 300, collected: false, radius: 10 },
    ],
    walls: [],
    gravityZones: [
      { x: 100, y: 100, w: 200, h: 200, force: { x: 3, y: 3 } },
      { x: 100, y: 300, w: 200, h: 200, force: { x: -3, y: -3 } },
    ],
  },
  {
    id: 26, name: "Prison Break", maxShots: 5, par: 3, gravity: 0.3,
    cannon: { x: 200, y: 300, angle: -90, power: 8 },
    portal: { x: 200, y: 30, radius: 16 },
    stars: [
      { x: 100, y: 200, collected: false, radius: 10 },
      { x: 300, y: 200, collected: false, radius: 10 },
      { x: 200, y: 500, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 100, y: 150, w: 200, h: 15, type: 'breakable', hp: 2 },
      { x: 100, y: 150, w: 15, h: 300, type: 'breakable', hp: 1 },
      { x: 285, y: 150, w: 15, h: 300, type: 'breakable', hp: 1 },
      { x: 100, y: 450, w: 200, h: 15, type: 'breakable', hp: 1 },
      { x: 50, y: 60, w: 300, h: 10, type: 'deadly' },
    ],
  },
  {
    id: 27, name: "Speedrun", maxShots: 1, par: 1, gravity: 0.45,
    cannon: { x: 30, y: 530, angle: -40, power: 13 },
    portal: { x: 370, y: 50, radius: 16 },
    stars: [
      { x: 200, y: 200, collected: false, radius: 10 },
      { x: 100, y: 400, collected: false, radius: 10 },
      { x: 350, y: 300, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'bouncy' },
      { x: 0, y: 0, w: 400, h: 15, type: 'bouncy' },
      { x: 150, y: 350, w: 100, h: 10, type: 'deadly' },
      { x: 250, y: 150, w: 80, h: 10, type: 'deadly' },
    ],
  },
  {
    id: 28, name: "Gravity Storm", maxShots: 3, par: 1, gravity: 0.1,
    cannon: { x: 50, y: 520, angle: -45, power: 6 },
    portal: { x: 350, y: 80, radius: 16 },
    stars: [
      { x: 100, y: 100, collected: false, radius: 10 },
      { x: 300, y: 500, collected: false, radius: 10 },
      { x: 200, y: 300, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 0, y: 0, w: 400, h: 15, type: 'solid' },
    ],
    gravityZones: [
      { x: 0, y: 0, w: 200, h: 200, force: { x: 2, y: 2 } },
      { x: 200, y: 0, w: 200, h: 200, force: { x: -2, y: 2 } },
      { x: 0, y: 400, w: 200, h: 200, force: { x: 2, y: -2 } },
      { x: 200, y: 400, w: 200, h: 200, force: { x: -2, y: -2 } },
    ],
  },
  {
    id: 29, name: "The Gauntlet", maxShots: 4, par: 2, gravity: 0.3,
    cannon: { x: 30, y: 300, angle: 0, power: 7 },
    portal: { x: 370, y: 300, radius: 14 },
    stars: [
      { x: 120, y: 300, collected: false, radius: 10 },
      { x: 240, y: 300, collected: false, radius: 10 },
      { x: 330, y: 300, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 240, w: 400, h: 8, type: 'deadly' },
      { x: 0, y: 360, w: 400, h: 8, type: 'deadly' },
      { x: 80, y: 248, w: 15, h: 112, type: 'breakable', hp: 1 },
      { x: 180, y: 248, w: 15, h: 112, type: 'breakable', hp: 2 },
      { x: 280, y: 248, w: 15, h: 112, type: 'breakable', hp: 1 },
    ],
    movingPlatforms: [
      { x: 130, y: 290, w: 30, h: 8, type: 'deadly', moveAxis: 'y', moveRange: 40, moveSpeed: 4 },
      { x: 230, y: 290, w: 30, h: 8, type: 'deadly', moveAxis: 'y', moveRange: 40, moveSpeed: 5, initialOffset: 1.5 },
    ],
  },
  {
    id: 30, name: "Final Challenge", maxShots: 5, par: 3, gravity: 0.25,
    cannon: { x: 200, y: 550, angle: -90, power: 10 },
    portal: { x: 200, y: 30, radius: 14 },
    stars: [
      { x: 60, y: 100, collected: false, radius: 10 },
      { x: 340, y: 100, collected: false, radius: 10 },
      { x: 200, y: 300, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 0, y: 0, w: 400, h: 15, type: 'solid' },
      { x: 100, y: 200, w: 200, h: 12, type: 'deadly' },
      { x: 50, y: 400, w: 300, h: 12, type: 'breakable', hp: 2 },
    ],
    movingPlatforms: [
      { x: 50, y: 130, w: 80, h: 12, type: 'deadly', moveAxis: 'x', moveRange: 100, moveSpeed: 3 },
      { x: 250, y: 130, w: 80, h: 12, type: 'deadly', moveAxis: 'x', moveRange: 100, moveSpeed: 3, initialOffset: 2 },
    ],
    gravityZones: [
      { x: 0, y: 250, w: 200, h: 150, force: { x: 2, y: -0.5 } },
      { x: 200, y: 250, w: 200, h: 150, force: { x: -2, y: -0.5 } },
    ],
  },

  // === BONUS LEVELS (31-35) ===
  {
    id: 31, name: "Bonus: Pinball", maxShots: 3, par: 1, gravity: 0.35,
    cannon: { x: 200, y: 80, angle: 90, power: 4 },
    portal: { x: 200, y: 530, radius: 14 },
    stars: [
      { x: 100, y: 200, collected: false, radius: 10 },
      { x: 300, y: 200, collected: false, radius: 10 },
      { x: 200, y: 350, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 560, w: 180, h: 40, type: 'solid' },
      { x: 220, y: 560, w: 180, h: 40, type: 'solid' },
      { x: 80, y: 150, w: 30, h: 30, type: 'bouncy' },
      { x: 290, y: 150, w: 30, h: 30, type: 'bouncy' },
      { x: 150, y: 250, w: 30, h: 30, type: 'bouncy' },
      { x: 220, y: 250, w: 30, h: 30, type: 'bouncy' },
      { x: 100, y: 380, w: 30, h: 30, type: 'bouncy' },
      { x: 270, y: 380, w: 30, h: 30, type: 'bouncy' },
      { x: 185, y: 430, w: 30, h: 30, type: 'bouncy' },
    ],
  },
  {
    id: 32, name: "Bonus: Zero-G", maxShots: 2, par: 1, gravity: 0,
    cannon: { x: 50, y: 300, angle: -10, power: 5 },
    portal: { x: 350, y: 300, radius: 16 },
    stars: [
      { x: 200, y: 150, collected: false, radius: 12 },
      { x: 200, y: 450, collected: false, radius: 12 },
      { x: 200, y: 300, collected: false, radius: 12 },
    ],
    walls: [
      { x: 0, y: 0, w: 400, h: 10, type: 'bouncy' },
      { x: 0, y: 590, w: 400, h: 10, type: 'bouncy' },
      { x: 150, y: 100, w: 100, h: 10, type: 'deadly' },
      { x: 150, y: 490, w: 100, h: 10, type: 'deadly' },
    ],
  },
  {
    id: 33, name: "Bonus: Chaos", maxShots: 4, par: 2, gravity: 0.2,
    cannon: { x: 200, y: 300, angle: -90, power: 8 },
    portal: { x: 200, y: 550, radius: 14 },
    stars: [
      { x: 50, y: 50, collected: false, radius: 10 },
      { x: 350, y: 50, collected: false, radius: 10 },
      { x: 200, y: 50, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 575, w: 180, h: 25, type: 'solid' },
      { x: 220, y: 575, w: 180, h: 25, type: 'solid' },
    ],
    movingPlatforms: [
      { x: 50, y: 150, w: 80, h: 10, type: 'bouncy', moveAxis: 'x', moveRange: 100, moveSpeed: 4 },
      { x: 250, y: 150, w: 80, h: 10, type: 'bouncy', moveAxis: 'x', moveRange: 100, moveSpeed: 4, initialOffset: 2 },
      { x: 150, y: 300, w: 100, h: 10, type: 'deadly', moveAxis: 'x', moveRange: 80, moveSpeed: 5 },
      { x: 100, y: 450, w: 80, h: 10, type: 'bouncy', moveAxis: 'y', moveRange: 50, moveSpeed: 3 },
      { x: 220, y: 450, w: 80, h: 10, type: 'bouncy', moveAxis: 'y', moveRange: 50, moveSpeed: 3, initialOffset: 1 },
    ],
    gravityZones: [
      { x: 0, y: 0, w: 400, h: 100, force: { x: 0, y: -0.5 } },
    ],
  },
  {
    id: 34, name: "Bonus: Spiral", maxShots: 3, par: 1, gravity: 0.15,
    cannon: { x: 200, y: 50, angle: 90, power: 4 },
    portal: { x: 200, y: 530, radius: 16 },
    stars: [
      { x: 340, y: 180, collected: false, radius: 10 },
      { x: 60, y: 360, collected: false, radius: 10 },
      { x: 300, y: 480, collected: false, radius: 10 },
    ],
    walls: [
      { x: 0, y: 560, w: 400, h: 40, type: 'solid' },
      { x: 80, y: 120, w: 320, h: 12, type: 'solid' },
      { x: 0, y: 240, w: 320, h: 12, type: 'solid' },
      { x: 80, y: 360, w: 320, h: 12, type: 'solid' },
      { x: 0, y: 480, w: 320, h: 12, type: 'solid' },
    ],
  },
  {
    id: 35, name: "Bonus: Impossible", maxShots: 6, par: 4, gravity: 0.3,
    cannon: { x: 50, y: 550, angle: -80, power: 12 },
    portal: { x: 350, y: 50, radius: 12 },
    stars: [
      { x: 100, y: 100, collected: false, radius: 8 },
      { x: 300, y: 300, collected: false, radius: 8 },
      { x: 100, y: 500, collected: false, radius: 8 },
    ],
    walls: [
      { x: 0, y: 575, w: 400, h: 25, type: 'solid' },
      { x: 0, y: 0, w: 400, h: 10, type: 'solid' },
      { x: 80, y: 80, w: 80, h: 10, type: 'breakable', hp: 2 },
      { x: 240, y: 80, w: 80, h: 10, type: 'breakable', hp: 2 },
      { x: 100, y: 200, w: 200, h: 8, type: 'deadly' },
      { x: 50, y: 350, w: 300, h: 8, type: 'deadly' },
      { x: 150, y: 500, w: 100, h: 8, type: 'deadly' },
    ],
    movingPlatforms: [
      { x: 150, y: 150, w: 60, h: 10, type: 'bouncy', moveAxis: 'x', moveRange: 80, moveSpeed: 4 },
      { x: 100, y: 280, w: 60, h: 10, type: 'bouncy', moveAxis: 'x', moveRange: 100, moveSpeed: 3 },
      { x: 200, y: 430, w: 60, h: 10, type: 'bouncy', moveAxis: 'x', moveRange: 80, moveSpeed: 5 },
    ],
    gravityZones: [
      { x: 0, y: 200, w: 100, h: 150, force: { x: 3, y: -1 } },
      { x: 300, y: 200, w: 100, h: 150, force: { x: -3, y: -1 } },
    ],
  },
];
