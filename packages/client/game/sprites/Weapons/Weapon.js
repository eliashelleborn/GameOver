import Phaser from 'phaser';
import ThrustBar from '../ThrustBar';

export default class Weapon extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.damage = 50;
    this.scene.add.existing(this);
    this.thrust = 0;
    this.maxThrust = 1000;
    this.loadingThrust = Math.round(this.maxThrust * 0.005);
    this.thrustBar = new ThrustBar({
      scene: this.scene,
      x: this.x,
      y: this.y,
      key: 'thrust-bar',
    }).setDepth(1);
  }

  update(x, y) {
    this.x = x;
    this.y = y;
    this.thrustBar.update(this.x, this.y, this.thrust, this.maxThrust);
    if (this.projectile) {
      this.projectile.update();
    }
  }

  addThrust() {
    if (this.thrust < this.maxThrust) {
      this.thrust += this.loadingThrust;
    }
  }
}
