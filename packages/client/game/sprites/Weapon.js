import Phaser from 'phaser';
import Projectile from './Projectile';
import ThrustBar from './ThrustBar';

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
    });
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
