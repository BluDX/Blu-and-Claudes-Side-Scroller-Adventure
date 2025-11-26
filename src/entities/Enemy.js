import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Enemy properties
    this.health = 1;
    this.speed = 80;
    this.direction = -1; // -1 = left, 1 = right
    this.patrolStart = x - 100;
    this.patrolEnd = x + 100;

    // Physics setup
    this.setCollideWorldBounds(true);
    this.setBounce(0);
  }

  update() {
    this.patrol();
    this.updateAnimation();
  }

  patrol() {
    // Move back and forth
    this.setVelocityX(this.speed * this.direction);

    // Reverse at patrol bounds
    if (this.x <= this.patrolStart) {
      this.direction = 1;
    }
    if (this.x >= this.patrolEnd) {
      this.direction = -1;
    }

    // Flip sprite based on direction
    this.setFlipX(this.direction === 1);
  }

  updateAnimation() {
    // Override in subclasses
  }

  takeDamage() {
    this.health--;
    if (this.health <= 0) {
      this.defeat();
    }
  }

  defeat() {
    // Play defeat animation
    this.setVelocity(0, -200); // Bounce up slightly
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 300,
      onComplete: () => this.destroy()
    });

    // TODO: Play defeat sound when audio is added
  }
}
