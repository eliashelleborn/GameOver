import Phaser from 'phaser';
import Projectile from './Projectile';

export default class Weapon extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.damage = 50;
    this.scene.add.existing(this);
    this.thrust = 0;
    this.maxThrust = 2000;
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

  fire(direction, angle) {
    // Calculation to get dx, dy, the dynamic values to get x and y velocity in projectil
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);


    this.projectile = new Projectile({
      scene: this.scene,
      key: 'bullet',
      x: this.x,
      y: this.y,
      force: this.thrust,
      dx,
      dy,
      damage: this.damage,
      direction,
    });
    this.thrust = 0;
  }
}
