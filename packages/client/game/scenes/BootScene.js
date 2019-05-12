import Phaser from 'phaser';

// Maps
import map from '../assets/maps/map.json';
import testMap from '../assets/maps/test-map.json';
import inca from '../assets/maps/inca_front.png';

// Backgrounds
import background from '../assets/backgrounds/background.png';

// Ghosts
import blue from '../assets/sprites/ghost-blue.png';
import green from '../assets/sprites/ghost-green.png';
import red from '../assets/sprites/ghost-red.png';

// Animations
import makeAnimations from '../animations/animations';

// Weapons
import bullet from '../assets/sprites/bullet.png';
import bazooka from '../assets/sprites/bazooka.png';

// Crosshair
import crosshair from '../assets/sprites/crosshair.png';

// Explosion
import explosion from '../assets/sprites/explosion.png';

import store from '../../app/store';

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene',
    });
  }

  preload() {
    const {
      testing
    } = store.getState().game;

    // Collection of loading to do.
    const progress = this.add.graphics();

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on('complete', () => {
      // prepare all animations, defined in a separate file
      makeAnimations(this);
      progress.destroy();

      this.scene.start(testing ? 'TestScene' : 'GameScene');
    });

    // Map Images
    this.load.tilemapTiledJSON('map', testing ? testMap : map);
    this.load.spritesheet('inca', inca, {
      frameWidth: 16,
      frameHeight: 16,
    });

    // Background
    this.load.image('background', background);

    // Sprites
    this.load.spritesheet('blue', blue, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('green', green, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('red', red, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Weapons
    this.load.spritesheet('bullet', bullet, {
      frameWidth: 32,
      frameHeight: 24,
    });

    this.load.spritesheet('bazooka', bazooka, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Crosshair
    this.load.spritesheet('crosshair', crosshair, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Explosion
    this.load.spritesheet('explosion', explosion, {
      frameWidth: 34,
      frameHeight: 32,
    });
  }
}

export default BootScene;
