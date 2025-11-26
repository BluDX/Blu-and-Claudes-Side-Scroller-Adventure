import Phaser from 'phaser';
import { PLAYER } from '../config/constants.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player-stand');

    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Create animations if they don't exist
    this.createAnimations();

    // Player properties
    this.health = PLAYER.MAX_HEALTH;
    this.isCrouching = false;
    this.isInvincible = false;
    this.coyoteTime = 0;
    this.jumpBufferTime = 0;

    // Physics setup
    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.setDrag(0, 0);
    this.setMaxVelocity(PLAYER.SPEED * 1.5, 1000);
    this.setSize(40, 60); // Collision box size
    this.setOffset(15, 12); // Center the collision box

    // Input
    this.cursors = scene.input.keyboard.createCursorKeys();

    // Jump variables
    this.isJumping = false;
    this.jumpPressedTime = 0;
    this.maxJumpTime = 200; // Maximum time player can hold jump for variable height
  }

  createAnimations() {
    // Only create animations if they don't already exist
    if (!this.scene.anims.exists('walk')) {
      this.scene.anims.create({
        key: 'walk',
        frames: this.scene.anims.generateFrameNames('player-walk'),
        frameRate: 10,
        repeat: -1
      });
    }
  }

  update(time, delta) {
    this.handleMovement();
    this.handleJump(time, delta);
    this.handleCrouch();
    this.updateCoyoteTime(delta);
    this.updateJumpBuffer(delta);
    this.updateAnimation();
  }

  updateAnimation() {
    const isOnGround = this.body.touching.down || this.body.blocked.down;
    const isMoving = this.cursors.left.isDown || this.cursors.right.isDown;

    if (this.isCrouching) {
      this.anims.stop();
      this.setTexture('player-duck');
    } else if (!isOnGround) {
      this.anims.stop();
      this.setTexture('player-jump');
    } else if (isMoving) {
      // Walking - only when keys are pressed
      if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'walk') {
        this.play('walk');
      }
    } else {
      // Standing still - stop animation
      this.anims.stop();
      this.setTexture('player-stand');
    }
  }

  handleMovement() {
    const speed = this.isCrouching ? PLAYER.CROUCH_SPEED : PLAYER.SPEED;

    if (this.cursors.left.isDown) {
      this.setVelocityX(-speed);
      this.setFlipX(true); // Face left
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(speed);
      this.setFlipX(false); // Face right
    } else {
      // Stop immediately when no input
      const currentVelX = this.body.velocity.x;
      if (Math.abs(currentVelX) < 5) {
        this.setVelocityX(0);
      } else {
        this.setVelocityX(currentVelX * 0.85);
      }
    }
  }

  handleJump(time, delta) {
    const isOnGround = this.body.touching.down || this.body.blocked.down;

    // Update coyote time
    if (isOnGround) {
      this.coyoteTime = 100; // 100ms grace period
      this.isJumping = false;
    }

    // Jump buffer: if player presses jump slightly before landing
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.jumpBufferTime = 100; // 100ms buffer
    }

    // Check if can jump (on ground OR within coyote time OR jump buffered)
    const canJump = (isOnGround || this.coyoteTime > 0) && !this.isJumping;

    if (canJump && (Phaser.Input.Keyboard.JustDown(this.cursors.up) || this.jumpBufferTime > 0)) {
      this.startJump(time);
      this.jumpBufferTime = 0;
      this.coyoteTime = 0;
    }

    // Variable jump height: release jump early for shorter jump
    if (this.isJumping && this.cursors.up.isUp) {
      // Player released jump button, reduce upward velocity
      if (this.body.velocity.y < 0) {
        this.setVelocityY(this.body.velocity.y * 0.5);
      }
      this.isJumping = false;
    }

    // Maximum jump time check
    if (this.isJumping && time - this.jumpPressedTime > this.maxJumpTime) {
      this.isJumping = false;
    }
  }

  startJump(time) {
    this.setVelocityY(PLAYER.JUMP_VELOCITY);
    this.isJumping = true;
    this.jumpPressedTime = time;
    // TODO: Play jump sound here when audio is added
  }

  handleCrouch() {
    if (this.cursors.down.isDown && this.body.touching.down) {
      if (!this.isCrouching) {
        this.isCrouching = true;
        // Reduce hitbox height when crouching
        this.setSize(40, 30);
        this.setOffset(15, 42);
      }
    } else {
      if (this.isCrouching) {
        this.isCrouching = false;
        // Restore normal hitbox
        this.setSize(40, 60);
        this.setOffset(15, 12);
      }
    }
  }

  updateCoyoteTime(delta) {
    if (this.coyoteTime > 0) {
      this.coyoteTime -= delta;
    }
  }

  updateJumpBuffer(delta) {
    if (this.jumpBufferTime > 0) {
      this.jumpBufferTime -= delta;
    }
  }

  takeDamage() {
    if (this.isInvincible) return;

    this.health--;
    this.isInvincible = true;

    // Flash effect - simpler version
    let flashCount = 0;
    const flashInterval = this.scene.time.addEvent({
      delay: 150,
      repeat: 5,
      callback: () => {
        flashCount++;
        this.alpha = flashCount % 2 === 0 ? 0.3 : 1;
        if (flashCount >= 5) {
          this.alpha = 1;
          this.isInvincible = false;
        }
      }
    });

    // TODO: Play hurt sound when audio is added

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    // TODO: Trigger game over scene
    this.scene.scene.start('GameOverScene');
  }

  collectPowerUp(type) {
    // Power-up collection logic will be added in Phase 5
    console.log('Collected power-up:', type);
  }
}
