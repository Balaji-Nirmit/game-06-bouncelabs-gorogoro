export interface Vec2 {
  x: number;
  y: number;
}

export interface Ball {
  pos: Vec2;
  vel: Vec2;
  radius: number;
  isLaunched: boolean;
  isActive: boolean;
  trail: Vec2[];
  bounceCount: number;
}

export interface Wall {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'solid' | 'bouncy' | 'deadly' | 'breakable' | 'ice';
  angle?: number;
  hp?: number;
  color?: string;
}

export interface Star {
  x: number;
  y: number;
  collected: boolean;
  radius: number;
}

export interface Portal {
  x: number;
  y: number;
  radius: number;
}

export interface MovingPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'solid' | 'bouncy' | 'deadly';
  moveAxis: 'x' | 'y';
  moveRange: number;
  moveSpeed: number;
  initialOffset?: number;
}

export interface GravityZone {
  x: number;
  y: number;
  w: number;
  h: number;
  force: Vec2;
}

export interface Cannon {
  x: number;
  y: number;
  angle: number;
  power: number;
}

export interface Level {
  id: number;
  name: string;
  walls: Wall[];
  stars: Star[];
  portal: Portal;
  cannon: Cannon;
  movingPlatforms?: MovingPlatform[];
  gravityZones?: GravityZone[];
  gravity?: number;
  maxShots: number;
  par: number;
  bgColor?: string;
}

export type GameScreen = 'menu' | 'levels' | 'playing' | 'paused' | 'win' | 'lose';

export interface GameState {
  screen: GameScreen;
  currentLevel: number;
  score: number;
  totalStars: number;
  shotsUsed: number;
  starsCollected: number;
  levelScores: Record<number, { stars: number; score: number; completed: boolean }>;
  ball: Ball;
  aiming: boolean;
  aimAngle: number;
  aimPower: number;
}
