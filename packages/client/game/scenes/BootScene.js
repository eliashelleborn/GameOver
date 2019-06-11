import Phaser from 'phaser';

// Maps
import newMap from '../assets/maps/magic_cliffs.json';
import cliffs from '../assets/maps/cliffs-tileset-extruded.png';

// Backgrounds
import backgroundSky from '../assets/backgrounds/backgroud-sky.png';
import backgroundSea from '../assets/backgrounds/backgroud-sea.png';

// Ghosts
import blue from '../assets/sprites/ghost-blue.png';
import green from '../assets/sprites/ghost-green.png';
import red from '../assets/sprites/ghost-red.png';
import yellow from '../assets/sprites/ghost-yellow.png';
import purple from '../assets/sprites/ghost-purple.png';
import darkblue from '../assets/sprites/ghost-darkblue.png';
import turquoise from '../assets/sprites/ghost-turquoise.png';
import grey from '../assets/sprites/ghost-grey.png';

// Animations
import makeSpriteAnimations from '../animations/sprites';
import makeWeaponsAnimations from '../animations/weapons';

// Weapons
import missile from '../assets/sprites/bullet.png';
import bazooka from '../assets/sprites/bazooka.png';
import bomb from '../assets/sprites/bomb.png';
import grenadelauncher from '../assets/sprites/grenadelauncher.png';

// Crosshair
import crosshair from '../assets/sprites/crosshair.png';

// Explosion
import explosion from '../assets/sprites/explosion.png';

// Thrust Bar
import thrustBar from '../assets/sprites/thrust-bar.png';

// Crate
import crate from '../assets/sprites/crate.png';

import store from '../../app/store';

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene',
    });
  }

  preload() {
    const {
      testing,
    } = store.getState().game;

    // Collection of loading to do.
    const progress = this.add.graphics();

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on('complete', () => {
      // prepare all animations, defined in a separate file
      makeSpriteAnimations(this);
      makeWeaponsAnimations(this);
      progress.destroy();

      this.scene.start(testing ? 'TestScene' : 'GameScene');
    });

    // Map Images
    this.load.tilemapTiledJSON('map', newMap);
    this.load.spritesheet('cliffs', cliffs, {
      frameWidth: 8,
      frameHeight: 8,
      margin: 1,
      spacing: 2,
    });

    // Background
    this.load.image('background-sky', backgroundSky);
    this.load.image('background-sea', backgroundSea);

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
    this.load.spritesheet('yellow', yellow, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('purple', purple, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('darkblue', darkblue, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('turquoise', turquoise, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('grey', grey, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Weapons
    this.load.spritesheet('missile', missile, {
      frameWidth: 32,
      frameHeight: 24,
    });
    this.load.spritesheet('bazooka', bazooka, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('grenade', bomb, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('grenadelauncher', grenadelauncher, {
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

    // Thrust Bar
    this.load.spritesheet('thrust-bar', thrustBar, {
      frameWidth: 50,
      frameHeight: 10,
    });

    // Crates
    this.load.spritesheet('crate', crate, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
}

export default BootScene;
