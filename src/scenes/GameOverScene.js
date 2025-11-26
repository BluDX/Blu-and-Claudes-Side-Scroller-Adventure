import Phaser from 'phaser';
import { SCENES } from '../config/constants.js';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SCENES.GAMEOVER);
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.cameras.main.setBackgroundColor('#000000');

    // Game Over text
    const gameOverText = this.add.text(width / 2, height / 3, 'GAME OVER', {
      fontSize: '64px',
      fontFamily: 'Arial',
      fill: '#ff0000',
      fontStyle: 'bold'
    });
    gameOverText.setOrigin(0.5);

    // Final score
    const finalScore = this.registry.get('score') || 0;
    const scoreText = this.add.text(width / 2, height / 2, `Final Score: ${finalScore}`, {
      fontSize: '32px',
      fontFamily: 'Arial',
      fill: '#ffffff'
    });
    scoreText.setOrigin(0.5);

    // Retry button
    const retryButton = this.add.text(width / 2, height / 2 + 80, 'RETRY', {
      fontSize: '28px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      backgroundColor: '#4a4a4a',
      padding: { x: 20, y: 10 }
    });
    retryButton.setOrigin(0.5);
    retryButton.setInteractive({ useHandCursor: true });

    retryButton.on('pointerover', () => {
      retryButton.setStyle({ fill: '#ffff00' });
    });

    retryButton.on('pointerout', () => {
      retryButton.setStyle({ fill: '#ffffff' });
    });

    retryButton.on('pointerdown', () => {
      this.retry();
    });

    // Main Menu button
    const menuButton = this.add.text(width / 2, height / 2 + 140, 'MAIN MENU', {
      fontSize: '28px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      backgroundColor: '#4a4a4a',
      padding: { x: 20, y: 10 }
    });
    menuButton.setOrigin(0.5);
    menuButton.setInteractive({ useHandCursor: true });

    menuButton.on('pointerover', () => {
      menuButton.setStyle({ fill: '#ffff00' });
    });

    menuButton.on('pointerout', () => {
      menuButton.setStyle({ fill: '#ffffff' });
    });

    menuButton.on('pointerdown', () => {
      this.scene.start(SCENES.MENU);
    });
  }

  retry() {
    // Reset score and lives
    this.registry.set('score', 0);
    this.registry.set('lives', 3);
    this.registry.set('currentLevel', 1);

    // Restart level 1
    this.scene.start(SCENES.LEVEL1);
  }
}
