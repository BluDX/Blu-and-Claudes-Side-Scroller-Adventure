import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 1024,
  height: 576,
  backgroundColor: '#87CEEB',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: false,
      tileBias: 32
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: false,
  antialias: true
};
