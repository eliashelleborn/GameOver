import Phaser from 'phaser';
import Projectile from './Projectile';

export default class Weapon extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.damage = 10;
    this.scene.add.existing(this);
    this.thrust = 0;
    this.maxThrust = 2000;
    this.angle = null;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }

  addThrust() {
    if (this.thrust < this.maxThrust) {
      this.thrust += 10;
    }
  }

  setAngle() {
    if (this.x < this.scene.crosshair.x) {
      this.angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.scene.crosshair.x,
        this.scene.crosshair.y,
      );
    } else {
      this.angle = -Phaser.Math.Angle.Between(
        this.scene.crosshair.x,
        this.scene.crosshair.y,
        this.x,
        this.y,
      );
    }
  }

  fire(direction) {
    // Creating a projectile which fires away
    new Projectile({
      scene: this.scene,
      key: 'bullet',
      x: this.x,
      y: this.y,
      force: this.thrust,
      angle: this.angle,
      direction
    });
    this.thrust = 0;
  }
}
