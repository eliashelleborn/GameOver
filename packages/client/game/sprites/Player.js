
import Weapon from './Weapon';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {

    super(config.scene, config.x, config.y, config.key, config.id);


    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.scene.collide
    this.scene.physics.add.collider(this, this.scene.groundLayer);
    this.body.setBounce(0.3);
    this.body.setCollideWorldBounds(true);
    this.direction = 1;

    this.velocity = {
      x: 150,
      y: -400
    }
    this.health = 100
    this.id = config.id
    this.myTurn = false;

    this.animations = {
      left: `${config.key}-left`,
      right: `${config.key}-right`,
      standLeft: `${config.key}-standLeft`,
      standRight: `${config.key}-standRight`
    }
    this.weapon = new Weapon({
      scene: this.scene,
      key: 'bazooka',
      x: this.x,
      y: this.y
    });

  }
  create() {

  }

  update(keys) {
    // // Moving the player
    if (keys.left && this.myTurn) {
      this.run(-this.velocity.x)
    } else if (keys.right && this.myTurn) {
      this.run(this.velocity.x)
    } else {
      this.run(0);
    }

    // JUMP
    if (keys.jump && this.body.onFloor()) {
      this.jump();
    }

    // FIRE WEAPON
    if (keys.fire) {
      this.startFire(keys.fire);
    } else if (!keys.fire && this.startedFire) {
      this.fire()
    }
    if (this.weapon) {
      this.weapon.update(this.x, this.y);
    }
  }
  run(vel) {
    this.body.setVelocityX(vel);
    if (vel < 0) {
      this.direction = -1;
      this.anims.play(this.animations.left, true);
    } else if (vel > 0) {
      this.direction = 1;
      this.anims.play(this.animations.right, true);
    } else if (this.direction === 1) {
      this.anims.play(this.animations.standLeft);
    } else {
      this.anims.play(this.animations.standRight);
    }
  }
  jump() {
    this.body.setVelocityY(this.velocity.y);
  }
  isItMyTurn(playersTurn) {
    this.myTurn = playersTurn === this.id;
  }

  startFire(firing) {
    this.weapon.addThrust();
    this.startedFire = true;
  }

  fire() {
    this.startedFire = false;
    let angle;
    let thrust = 0;

    this.weapon.setAngle();
    this.weapon.fire(this.direction);
  }
}
