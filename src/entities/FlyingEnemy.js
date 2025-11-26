import Enemy from './Enemy.js';
import { ENEMY } from '../config/constants.js';

export default class FlyingEnemy extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'fly-fly1');

    this.speed = ENEMY.FLYING_SPEED;
    this.setSize(35, 30);
    this.setOffset(10, 5);

    // Disable gravity for flying enemies
    this.body.setAllowGravity(false);

    // Sine wave movement
    this.startY = y;
    this.waveAmplitude = 50;
    this.waveFrequency = 0.02;
    this.time = 0;

    // Animation frame toggle
    this.animFrame = 0;
    this.animTimer = 0;
  }

  update() {
    super.update();

    // Add vertical sine wave motion
    this.time += this.waveFrequency;
    const offsetY = Math.sin(this.time) * this.waveAmplitude;
    this.y = this.startY + offsetY;
  }

  updateAnimation() {
    // Simple 2-frame wing flapping animation
    this.animTimer += 16;

    if (this.animTimer >= 150) {
      this.animFrame = (this.animFrame + 1) % 2;
      this.setTexture(this.animFrame === 0 ? 'fly-fly1' : 'fly-fly2');
      this.animTimer = 0;
    }
  }

  patrol() {
    // Only horizontal movement, no patrol bounds reversal
    this.setVelocityX(this.speed * this.direction);

    // Reverse at patrol bounds
    if (this.x <= this.patrolStart) {
      this.direction = 1;
    }
    if (this.x >= this.patrolEnd) {
      this.direction = -1;
    }

    // Flip sprite based on direction
    this.setFlipX(this.direction === -1);
  }
}
