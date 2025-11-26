import Phaser from 'phaser';
import { SCENES } from '../config/constants.js';

export default class VictoryScene extends Phaser.Scene {
  constructor() {
    super(SCENES.VICTORY);
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.cameras.main.setBackgroundColor('#000000');

    // Victory text
    const victoryText = this.add.text(width / 2, height / 4, 'VICTORY!', {
      fontSize: '72px',
      fontFamily: 'Arial',
      fill: '#FFD700',
      fontStyle: 'bold'
    });
    victoryText.setOrigin(0.5);

    // Animate victory text
    this.tweens.add({
      targets: victoryText,
      scale: 1.1,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Congratulations message
    const congratsText = this.add.text(width / 2, height / 2 - 50, 'You completed all 3 levels!', {
      fontSize: '28px',
      fontFamily: 'Arial',
      fill: '#ffffff'
    });
    congratsText.setOrigin(0.5);

    // Final score
    const finalScore = this.registry.get('score') || 0;
    const scoreText = this.add.text(width / 2, height / 2 + 10, `Final Score: ${finalScore}`, {
      fontSize: '36px',
      fontFamily: 'Arial',
      fill: '#FFD700',
      fontStyle: 'bold'
    });
    scoreText.setOrigin(0.5);

    // Play Again button
    const playAgainButton = this.add.text(width / 2, height / 2 + 100, 'PLAY AGAIN', {
      fontSize: '32px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      backgroundColor: '#4a4a4a',
      padding: { x: 20, y: 10 }
    });
    playAgainButton.setOrigin(0.5);
    playAgainButton.setInteractive({ useHandCursor: true });

    playAgainButton.on('pointerover', () => {
      playAgainButton.setStyle({ fill: '#ffff00' });
    });

    playAgainButton.on('pointerout', () => {
      playAgainButton.setStyle({ fill: '#ffffff' });
    });

    playAgainButton.on('pointerdown', () => {
      this.playAgain();
    });

    // Main Menu button
    const menuButton = this.add.text(width / 2, height / 2 + 170, 'MAIN MENU', {
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

    // Create celebratory stars
    for (let i = 0; i < 50; i++) {
      const star = this.add.text(
        Phaser.Math.Between(0, width),
        Phaser.Math.Between(0, height),
        '⭐',
        { fontSize: Phaser.Math.Between(20, 40) + 'px' }
      );
      star.setAlpha(0);

      this.tweens.add({
        targets: star,
        alpha: 1,
        duration: Phaser.Math.Between(500, 1500),
        delay: Phaser.Math.Between(0, 2000),
        yoyo: true,
        repeat: -1
      });
    }
  }

  playAgain() {
    // Reset score and lives
    this.registry.set('score', 0);
    this.registry.set('lives', 3);
    this.registry.set('currentLevel', 1);

    // Restart from level 1
    this.scene.start(SCENES.LEVEL1);
  }
}
