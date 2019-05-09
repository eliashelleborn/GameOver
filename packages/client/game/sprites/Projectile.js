export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.force);
    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.anims.play(config.key);
    this.scene.physics.add.collider(this, this.scene.players, () => this.hitGround());
    this.scene.physics.add.collider(this, this.scene.groundLayer, () => this.hitGround());
    this.body.setVelocityX(config.force);
    this.body.setVelocityY(-200);
  }

  update() {

  }
  hitGround() {
    this.destroy();
  }
}
