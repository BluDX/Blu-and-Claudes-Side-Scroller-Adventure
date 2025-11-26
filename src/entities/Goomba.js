import Enemy from './Enemy.js';
import { ENEMY } from '../config/constants.js';

export default class Goomba extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'slime-walk1');

    this.speed = ENEMY.GOOMBA_SPEED;
    this.setSize(40, 28);
    this.setOffset(10, 8);

    // Animation frame toggle
    this.animFrame = 0;
    this.animTimer = 0;
  }

  updateAnimation() {
    // Simple 2-frame animation
    this.animTimer += 16; // Approximately 16ms per frame at 60fps

    if (this.animTimer >= 200) {
      this.animFrame = (this.animFrame + 1) % 2;
      this.setTexture(this.animFrame === 0 ? 'slime-walk1' : 'slime-walk2');
      this.animTimer = 0;
    }
  }

  defeat() {
    // Use dead sprite
    this.setTexture('slime-dead');
    super.defeat();
  }
}
