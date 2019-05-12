export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(config, time) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.anims.play(config.key);
    this.scene.add.existing(this);
    this.scene.cameras.main.startFollow(this);
    this.timer = this.scene.time.now;
    this.damage = config.damage;
    this.scale = 5 * (config.damage / 100);
    this.setScale(this.scale);

    this.scene.physics.add.collider(this, this.scene.players, () => this.hitGround());
    this.scene.physics.add.collider(this, this.scene.groundLayer, () => this.hitGround());

    setTimeout(() => this.explode(this.scene), 650);

  }

  explode(scene) {

    scene.cameras.main.startFollow(scene.activePlayer);
    this.destroy();
  }
}
