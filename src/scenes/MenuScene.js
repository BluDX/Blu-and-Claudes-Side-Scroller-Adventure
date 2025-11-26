import Phaser from 'phaser';
import { SCENES } from '../config/constants.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENES.MENU);
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Title
    const title = this.add.text(width / 2, height / 3, "BLU & CLAUDE'S\nSIDE-SCROLLER\nADVENTURE", {
      fontSize: '40px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      align: 'center',
      fontStyle: 'bold',
      lineSpacing: 8
    });
    title.setOrigin(0.5);

    // Start button
    const startButton = this.add.text(width / 2, height / 2, 'START GAME', {
      fontSize: '32px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      backgroundColor: '#4a4a4a',
      padding: { x: 20, y: 10 }
    });
    startButton.setOrigin(0.5);
    startButton.setInteractive({ useHandCursor: true });

    startButton.on('pointerover', () => {
      startButton.setStyle({ fill: '#ffff00' });
    });

    startButton.on('pointerout', () => {
      startButton.setStyle({ fill: '#ffffff' });
    });

    startButton.on('pointerdown', () => {
      this.startGame();
    });

    // Controls info
    const controls = this.add.text(width / 2, height - 100,
      'Controls:\n← → Move | ↑ Jump | ↓ Crouch', {
      fontSize: '18px',
      fontFamily: 'Arial',
      fill: '#cccccc',
      align: 'center'
    });
    controls.setOrigin(0.5);
  }

  startGame() {
    // Initialize game state
    this.registry.set('score', 0);
    this.registry.set('currentLevel', 1);
    this.registry.set('lives', 3);

    this.scene.start(SCENES.LEVEL1);
  }
}
