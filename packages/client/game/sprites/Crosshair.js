import Phaser from 'phaser';

export default class Crosshair extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.key, config.x, config.y);
    this.scene = config.scene;
    this.anims.play('crosshair-s');
    this.scene.add.existing(this);
    this.y = config.y;
    this.x = config.x;

    this.graphics = this.scene.add.graphics();
    this.crosshairArea = new Phaser.Geom.Circle(this.x, this.y, 100);
  }

  update(x, y, angle) {
    this.crosshairArea.x = x;
    this.crosshairArea.y = y;
    Phaser.Geom.Circle.CircumferencePoint(this.crosshairArea, -angle, this);
  }
}
