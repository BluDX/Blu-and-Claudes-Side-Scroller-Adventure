export default class HUD {
  constructor(scene) {
    this.scene = scene;
    this.hearts = [];
    this.createHUD();
  }

  createHUD() {
    const padding = 16;

    // Semi-transparent background panel for HUD
    const panelWidth = 250;
    const panelHeight = 120;
    this.panel = this.scene.add.rectangle(padding, padding, panelWidth, panelHeight, 0x000000, 0.5);
    this.panel.setOrigin(0, 0);
    this.panel.setScrollFactor(0);
    this.panel.setDepth(100);

    // Level indicator
    const currentLevel = this.scene.registry.get('currentLevel') || 1;
    this.levelText = this.scene.add.text(padding + 10, padding + 10, `LEVEL ${currentLevel}`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      fill: '#FFD700',
      fontStyle: 'bold'
    });
    this.levelText.setScrollFactor(0);
    this.levelText.setDepth(101);

    // Health label
    this.healthLabel = this.scene.add.text(padding + 10, padding + 45, 'HEALTH:', {
      fontSize: '18px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontStyle: 'bold'
    });
    this.healthLabel.setScrollFactor(0);
    this.healthLabel.setDepth(101);

    // Heart icons for health
    this.createHearts(padding + 95, padding + 45);

    // Score display
    this.scoreLabel = this.scene.add.text(padding + 10, padding + 80, 'SCORE:', {
      fontSize: '18px',
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontStyle: 'bold'
    });
    this.scoreLabel.setScrollFactor(0);
    this.scoreLabel.setDepth(101);

    this.scoreText = this.scene.add.text(padding + 95, padding + 80, '0', {
      fontSize: '20px',
      fontFamily: 'Arial',
      fill: '#FFD700',
      fontStyle: 'bold'
    });
    this.scoreText.setScrollFactor(0);
    this.scoreText.setDepth(101);

    // Instructions (smaller, at bottom)
    this.instructionsText = this.scene.add.text(
      this.scene.cameras.main.width / 2,
      this.scene.cameras.main.height - 20,
      'Arrow Keys: Move/Jump  |  ESC: Menu',
      {
        fontSize: '14px',
        fontFamily: 'Arial',
        fill: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
        alpha: 0.7
      }
    );
    this.instructionsText.setOrigin(0.5);
    this.instructionsText.setScrollFactor(0);
    this.instructionsText.setDepth(101);
  }

  createHearts(x, y) {
    // Create 3 heart icons
    for (let i = 0; i < 3; i++) {
      const heart = this.scene.add.text(x + (i * 30), y, '❤️', {
        fontSize: '24px'
      });
      heart.setScrollFactor(0);
      heart.setDepth(101);
      this.hearts.push(heart);
    }
  }

  update(player) {
    // Update hearts based on player health
    for (let i = 0; i < this.hearts.length; i++) {
      if (i < player.health) {
        this.hearts[i].setText('❤️');
        this.hearts[i].setAlpha(1);
      } else {
        this.hearts[i].setText('🖤');
        this.hearts[i].setAlpha(0.5);
      }
    }

    // Update score
    const score = this.scene.registry.get('score') || 0;
    this.scoreText.setText(score.toString());

    // Pulse effect on score when it changes
    if (this.lastScore !== score) {
      this.scene.tweens.add({
        targets: this.scoreText,
        scale: 1.3,
        duration: 150,
        yoyo: true,
        ease: 'Power2'
      });
      this.lastScore = score;
    }
  }

  destroy() {
    this.panel.destroy();
    this.levelText.destroy();
    this.healthLabel.destroy();
    this.scoreLabel.destroy();
    this.scoreText.destroy();
    this.instructionsText.destroy();
    this.hearts.forEach(heart => heart.destroy());
  }
}
