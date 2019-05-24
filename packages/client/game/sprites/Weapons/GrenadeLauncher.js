import Grenade from '../Projectiles/Grenade';
import Weapon from './Weapon';

export default class GrenadeLauncher extends Weapon {
  fire(direction, angle) {
    // Calculation to get dx, dy, the dynamic values to get x and y velocity in projectil
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    this.projectile = new Grenade({
      scene: this.scene,
      key: 'grenade',
      x: this.x,
      y: this.y,
      force: this.thrust,
      dx,
      dy,
      damage: this.damage,
      direction,
      angle,
    });
    this.thrust = 0;
  }
}
