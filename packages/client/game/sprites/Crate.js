import Phaser from 'phaser';

export default class Crate extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.key, config.x, config.y);
    this.scene = config.scene;
    this.anims.play(config.key);
    this.scene.add.existing(this);
    this.y = config.y;
    this.x = config.x;

    this.graphics = this.scene.add.graphics();
  }

  update() {}
}
