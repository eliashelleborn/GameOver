import ClusterBomb from '../Projectiles/ClusterBomb/ClusterBomb';
import Weapon from './Weapon';

export default class ClusterBombLauncher extends Weapon {
  fire(direction, angle) {
    // Calculation to get dx, dy, the dynamic values to get x and y velocity in projectil
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    this.damage = 25;

    this.projectile = new ClusterBomb({
      scene: this.scene,
      key: 'clusterbomb',
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
