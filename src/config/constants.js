export const PLAYER = {
  SPEED: 200,
  JUMP_VELOCITY: -500,
  CROUCH_SPEED: 100,
  ACCELERATION: 800,
  DRAG: 600,
  MAX_HEALTH: 3
};

export const ENEMY = {
  GOOMBA_SPEED: 80,
  FLYING_SPEED: 120,
  PATROL_DISTANCE: 200
};

export const POWERUP = {
  COIN_VALUE: 10,
  STAR_DURATION: 5000,
  MUSHROOM_HEALTH: 1
};

export const LEVEL = {
  TILE_SIZE: 32,
  GRAVITY: 1000
};

export const SCENES = {
  BOOT: 'BootScene',
  PRELOADER: 'PreloaderScene',
  MENU: 'MenuScene',
  LEVEL1: 'Level1Scene',
  LEVEL2: 'Level2Scene',
  LEVEL3: 'Level3Scene',
  GAMEOVER: 'GameOverScene',
  VICTORY: 'VictoryScene'
};
