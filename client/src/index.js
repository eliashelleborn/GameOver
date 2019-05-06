import Phaser from 'phaser';

// Maps
import mapTest from './assets/maps/inca2.json';
import inca from './assets/maps/inca_front.png';

// Backgrounds
import background from './assets/backgrounds/background.png';

// Sprites
import star from './assets/sprites/star.png';
import dude from './assets/sprites/dude.png';

const config = {
  type: Phaser.AUTO,
  width: 1600,
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
let fireButton;
let bullets

function create(game) {

    // BULLETS
    bullets = this.physics.add.group({
        key: 'bullet',
        repeat: 10
    });
   


    // BACKGROUND
    bg = this.add.tileSprite(800, 100, 2200, 1200, 'background');

    // MAP
    map = this.make.tilemap({key: 'map'});
    var groundTiles = map.addTilesetImage('inca');
    groundLayer = map.createDynamicLayer('layer', groundTiles, 0, 0);

    // PLAYER
    player = this.physics.add.sprite(240, 450, 'dude');

    // BOUNCE WHEN HIT THE GROUND
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // PLAYER COLLISION
    this.physics.add.collider(player, groundLayer);
    groundLayer.setCollision([0, 1, 6, 7, 10, 11, 16, 17,22, 23, 26, 27, 38, 39, 40, 41, 70, 71, 100, 110, 120, 130])

    // CAMERA SETTINGS
    this.cameras.main.setBounds(0, 0, 1600, map.heightInPixels);
    
    // make the camera follow the player
    this.cameras.main.startFollow(player);

    // ANIMATIONS
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
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

    fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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

    // JUMP
    if (cursors.up.isDown && player.body.onFloor()) {
        player.setVelocityY(-530);
    }

    // FIRE
    if (fireButton.isDown) {
        fire();
    }
}


function fire () {
   
    // Get one of the bullets
    bullet = bullets.getFirstExists(false);
    
    if (bullet) {
        //  And fire it
        bullet.reset(player.x, player.y + 8);
        bullet.body.velocity.y = -400;
        bulletTime = game.time.now + 200;
    }

}