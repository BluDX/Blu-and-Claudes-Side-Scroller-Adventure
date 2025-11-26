import Phaser from 'phaser';
import { SCENES } from '../config/constants.js';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super(SCENES.PRELOADER);
  }

  preload() {
    // Create loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    // Load player sprites
    this.load.image('player-stand', 'assets/images/player/p1_stand.png');
    this.load.image('player-jump', 'assets/images/player/p1_jump.png');
    this.load.image('player-duck', 'assets/images/player/p1_duck.png');
    this.load.image('player-hurt', 'assets/images/player/p1_hurt.png');

    // Load player walk animation spritesheet
    this.load.atlas('player-walk', 'assets/images/player/p1_walk/p1_walk.png', 'assets/images/player/p1_walk/p1_walk.json');

    // Load tiles for platforms
    this.load.image('grass', 'assets/images/tiles/grassMid.png');
    this.load.image('grass-left', 'assets/images/tiles/grassLeft.png');
    this.load.image('grass-right', 'assets/images/tiles/grassRight.png');
    this.load.image('grass-center', 'assets/images/tiles/grassCenter.png');
    this.load.image('stone', 'assets/images/tiles/stoneMid.png');
    this.load.image('stone-left', 'assets/images/tiles/stoneLeft.png');
    this.load.image('stone-right', 'assets/images/tiles/stoneRight.png');

    // Load enemy sprites
    this.load.image('slime-walk1', 'assets/images/enemies/slimeWalk1.png');
    this.load.image('slime-walk2', 'assets/images/enemies/slimeWalk2.png');
    this.load.image('slime-dead', 'assets/images/enemies/slimeDead.png');
    this.load.image('fly-fly1', 'assets/images/enemies/flyFly1.png');
    this.load.image('fly-fly2', 'assets/images/enemies/flyFly2.png');

    // Load powerups
    this.load.image('coin-gold', 'assets/images/powerups/coinGold.png');
    this.load.image('coin-silver', 'assets/images/powerups/coinSilver.png');
    this.load.image('star', 'assets/images/powerups/star.png');
    this.load.image('mushroomRed', 'assets/images/powerups/mushroomRed.png');

    // Load level data
    this.load.json('level1', 'assets/levels/level1.json');
    this.load.json('level2', 'assets/levels/level2.json');
    this.load.json('level3', 'assets/levels/level3.json');
  }

  create() {
    this.scene.start(SCENES.MENU);
  }
}
