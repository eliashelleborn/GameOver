import Phaser from 'phaser';
import Explosion from './Explosion';

export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.force, config.direction);
    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.anims.play(config.key);
    this.scene.cameras.main.startFollow(this);

    // Adding Collision
    this.scene.physics.add.collider(this, this.scene.players, () => this.hitGround());
    this.scene.physics.add.collider(this, this.scene.groundLayer, () => this.hitGround());

    // Adding the amount of damage
    this.damage = config.damage;

    // Changing gravity
    this.body.setGravity(0, 0);

    // Calculating the velocities in X and Y
    // angleValue moves from 1 to -1 and affecting the velocity
    this.angleValue = config.angle / 1.5;

    this.velocityY = config.force * this.angleValue;

    if (this.angleValue < 0) {
      this.velocityX = config.force * (1 + this.angleValue) * config.direction;
    } else {
      this.velocityX = config.force * (1 - this.angleValue) * config.direction;
    }

    // Moving the projectile
    this.body.setVelocityX(this.velocityX);
    this.body.setVelocityY(this.velocityY);


  }

  hitGround() {
    // Move changeTurn to after explosion later
    // Took this away in testing
    // this.scene.changeTurn();
    this.explosion = new Explosion({
      scene: this.scene,
      x: this.x,
      y: this.y,
      key: 'explosion',
      damage: this.damage
    })
    this.destroy();
  }
}
