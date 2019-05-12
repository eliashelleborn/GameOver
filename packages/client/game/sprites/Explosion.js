export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(config, time) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.anims.play(config.key);
    this.scene.add.existing(this);
    this.scene.cameras.main.startFollow(this);
    this.timer = this.scene.time.now;
    console.log()
    this.setScale(5);

    setTimeout(() => this.explode(this.scene), 650);
  }

  explode(scene) {
    console.log('hej')
    console.log(scene)
    scene.cameras.main.startFollow(scene.activePlayer);
    this.destroy();
  }
}
