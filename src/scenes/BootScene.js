import Phaser from 'phaser';
import { SCENES } from '../config/constants.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENES.BOOT);
  }

  preload() {
    // Load any boot assets here (loading bar, logo, etc.)
  }

  create() {
    // Initialize game settings
    this.scene.start(SCENES.PRELOADER);
  }
}
