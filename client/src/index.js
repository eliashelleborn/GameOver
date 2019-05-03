import Phaser from 'phaser';

// Maps
import mapTest from './assets/maps/inca.json';
import inca from './assets/maps/inca_front.png';

// Backgrounds
import background from './assets/backgrounds/background.png';

// Sprites
import star from './assets/sprites/star.png';
import dude from './assets/sprites/dude.png';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.tilemapTiledJSON('map', mapTest);
    this.load.spritesheet('inca', inca, {
        frameWidth: 16,
        frameHeight: 16
    });
    this.load.image('background', background);
    this.load.image('star', star);
    this.load.spritesheet('dude', dude, {
        frameWidth: 32,
        frameHeight: 48
    });
   
}

let map;
let player;
let cursors;
let groundLayer
var text;
let bg;

function create() {
    // BACKGROUND
    bg = this.add.tileSprite(100, 100, 0, 0, 'background');

    // MAP
    map = this.make.tilemap({
        key: 'map'
    });
    var groundTiles = map.addTilesetImage('inca');
    groundLayer = map.createDynamicLayer('layer', groundTiles, 0, 0);


    

    // PLAYER
    player = this.physics.add.sprite(240, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, groundLayer);
    groundLayer.setCollision([0, 1, 22, 23, 26, 27, 28, 29, 32, 33, 38, 39, 40, 41, 60, 61, 70, 71, 100, 110, 120, 130])

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{
            key: 'dude',
            frame: 4
        }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });
}

function update() {
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-330);
    }
}
