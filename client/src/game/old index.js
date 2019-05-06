import Phaser from 'phaser';
import sky from './assets/sky.png';
import platform from './assets/platform.png';
import star from './assets/star.png';
import bomb from './assets/bomb.png';
import dude from './assets/dude.png';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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

const game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', sky);
  this.load.image('ground', platform);
  this.load.image('star', star);
  this.load.image('bomb', bomb);
  this.load.spritesheet('dude', dude, {
    frameWidth: 32,
    frameHeight: 48
  });
}

let platforms;
let stars;
let player;
let cursors;

var score = 0;
var scoreText;

function create() {
  this.add.image(400, 300, 'sky');

  // PLATFORMS
  platforms = this.physics.add.staticGroup();

  platforms
    .create(400, 568, 'ground')
    .setScale(2)
    .refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // STARS
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(function(child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(stars, platforms);

  // PLAYER
  player = this.physics.add.sprite(150, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  this.physics.add.collider(player, platforms);

  // SCORE
  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000'
  });
}

function collectStar(player, star) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);
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

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }

  // this.physics.add.overlap(player, stars, collectStar, null, this);
}
