import Phaser from 'phaser';

export default class ThrustBar extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.scene.add.existing(this);

    this.x = config.x;
    this.y = config.y;
    this.anims.play(config.key);
    this.anims.pause();
  }
  update(x, y, thrust, maxThrust) {
    this.x = x;
    this.y = y - 45;
    const maxFrames = this.anims.getTotalFrames() - 1;
    const frame = Math.round((thrust / maxThrust) * maxFrames);

    this.setFrame(frame);
  }
}
