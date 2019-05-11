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


  update() {

  }
  hitGround() {

    this.scene.cameras.main.startFollow(this.scene.activePlayer);
    // Move changeTurn to after explosion later
    this.scene.changeTurn();
    this.destroy();
  }
}
