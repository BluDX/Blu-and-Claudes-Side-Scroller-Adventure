import Phaser from 'phaser';
import { POWERUP } from '../config/constants.js';

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    // Determine sprite based on type
    let spriteKey;
    switch (type) {
      case 'coin':
        spriteKey = 'coin-gold';
        break;
      case 'star':
        spriteKey = 'star';
        break;
      case 'mushroom':
        spriteKey = 'mushroomRed';
        break;
      default:
        spriteKey = 'coin-gold';
    }

    super(scene, x, y, spriteKey);

    this.scene = scene;
    this.powerType = type;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Disable gravity for floating items
    this.body.setAllowGravity(false);

    // Set collision size
    this.setSize(40, 40);

    // Floating animation
    const startY = y;
    scene.tweens.add({
      targets: this,
      y: startY - 10,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Rotation for coins
    if (type === 'coin') {
      scene.tweens.add({
        targets: this,
        angle: 360,
        duration: 2000,
        repeat: -1
      });
    }

    // Pulsing effect for stars
    if (type === 'star') {
      scene.tweens.add({
        targets: this,
        scale: 1.2,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  collect(player) {
    switch (this.powerType) {
      case 'coin':
        this.collectCoin(player);
        break;
      case 'star':
        this.collectStar(player);
        break;
      case 'mushroom':
        this.collectMushroom(player);
        break;
    }

    // Visual effect on collection
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      scale: 2,
      y: this.y - 50,
      duration: 300,
      onComplete: () => this.destroy()
    });

    // Particle effect
    this.createCollectionEffect();
  }

  collectCoin(player) {
    const currentScore = this.scene.registry.get('score') || 0;
    this.scene.registry.set('score', currentScore + POWERUP.COIN_VALUE);

    // Show +10 floating text
    const scoreText = this.scene.add.text(this.x, this.y, '+' + POWERUP.COIN_VALUE, {
      fontSize: '20px',
      fontFamily: 'Arial',
      fill: '#FFD700',
      fontStyle: 'bold'
    });
    scoreText.setOrigin(0.5);

    this.scene.tweens.add({
      targets: scoreText,
      y: scoreText.y - 50,
      alpha: 0,
      duration: 1000,
      onComplete: () => scoreText.destroy()
    });

    // TODO: Play coin sound when audio is added
  }

  collectStar(player) {
    player.isInvincible = true;
    player.setTint(0xFFFF00); // Yellow tint

    // Timer to remove invincibility
    this.scene.time.delayedCall(POWERUP.STAR_DURATION, () => {
      player.isInvincible = false;
      player.clearTint();
    });

    // Show notification
    const invincibleText = this.scene.add.text(this.x, this.y, 'INVINCIBLE!', {
      fontSize: '24px',
      fontFamily: 'Arial',
      fill: '#FFFF00',
      fontStyle: 'bold'
    });
    invincibleText.setOrigin(0.5);

    this.scene.tweens.add({
      targets: invincibleText,
      y: invincibleText.y - 50,
      alpha: 0,
      duration: 1500,
      onComplete: () => invincibleText.destroy()
    });

    // TODO: Play powerup sound when audio is added
  }

  collectMushroom(player) {
    if (player.health < POWERUP.MUSHROOM_HEALTH + 2) { // Max health is 3
      player.health += POWERUP.MUSHROOM_HEALTH;

      // Cap at max health
      if (player.health > 3) {
        player.health = 3;
      }

      // Healing effect
      const healText = this.scene.add.text(this.x, this.y, '+1 HEALTH', {
        fontSize: '20px',
        fontFamily: 'Arial',
        fill: '#FF69B4',
        fontStyle: 'bold'
      });
      healText.setOrigin(0.5);

      this.scene.tweens.add({
        targets: healText,
        y: healText.y - 50,
        alpha: 0,
        duration: 1000,
        onComplete: () => healText.destroy()
      });

      // Flash player green briefly
      player.setTint(0x00FF00);
      this.scene.time.delayedCall(200, () => {
        if (!player.isInvincible) {
          player.clearTint();
        }
      });

      // TODO: Play healing sound when audio is added
      this.scene.events.emit('healthChanged', player.health);
    }
  }

  createCollectionEffect() {
    // Simplified - just a quick flash instead of particles
    const flash = this.scene.add.circle(this.x, this.y, 20, 0xFFFFFF, 0.8);

    this.scene.tweens.add({
      targets: flash,
      scale: 2,
      alpha: 0,
      duration: 300,
      onComplete: () => flash.destroy()
    });
  }
}
