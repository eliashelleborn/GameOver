import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.info);

    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.scene.collide;
    this.scene.physics.add.collider(this.body, this.scene.groundLayer);
    this.body.setBounce(0.3);
    this.body.setCollideWorldBounds(true);
    this.velocity = {
      x: 50,
      y: -400,
    };
    this.id = config.info.id;
    this.name = config.info.name;
    this.myTurn = false;

    this.animations = {
      left: `${config.key}-l`,
      right: `${config.key}-r`,
      stand: `${config.key}-s`,
    };

    // Show players name
    this.nameText = this.scene.add.text(this.x - 25, this.y - 50, this.name);
  }

  update(keys) {
    // // Moving the player
    if (keys.left && this.myTurn) {
      this.run(-this.velocity.x);
    } else if (keys.right && this.myTurn) {
      this.run(this.velocity.x);
    } else {
      this.run(0);
    }

    // JUMP
    if (keys.jump && this.body.onFloor()) {
      this.jump();
    }

    // Update text position
    this.nameText.setPosition(this.x - 25, this.y - 50);
  }

  run(vel) {
    this.body.setVelocityX(vel);
    if (vel < 0) {
      this.anims.play(this.animations.left, true);
    } else if (vel > 0) {
      this.anims.play(this.animations.right, true);
    } else {
      this.anims.play(this.animations.stand);
    }
  }

  jump() {
    this.body.setVelocityY(this.velocity.y);
  }

  isItMyTurn(playersTurn) {
    this.myTurn = playersTurn === this.id;
  }
}
