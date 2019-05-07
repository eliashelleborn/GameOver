// Maps
import mapTest from '../assets/maps/inca2.json';
import inca from '../assets/maps/inca_front.png';

// Backgrounds
import background from '../assets/backgrounds/background.png';

// Sprites
import star from '../assets/sprites/star.png';
import dude from '../assets/sprites/dude.png';
import blue from '../assets/sprites/ghost-blue.png'

// Animations
import makeAnimations from '../animations/animations.js'

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload () {
        // Collection of loading to do. 
        const progress = this.add.graphics();

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            makeAnimations(this);
            progress.destroy();

            this.scene.start('GameScene');
        });

        // Map Images
        this.load.tilemapTiledJSON('map', mapTest);
        this.load.spritesheet('inca', inca, {
            frameWidth: 16,
            frameHeight: 16
        });

        // Background
        this.load.image('background', background);

        // Sprites
        this.load.image('star', star);
        this.load.spritesheet('dude', dude, {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('blue',  blue, {
            frameWidth: 32,
            frameHeight: 32
        });
        


        
    }
} 

export default BootScene    ;
    