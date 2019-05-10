import Projectile from './Projectile';

export default class Weapon extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.key);
    this.scene = config.scene;
    this.damage = 10;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.thrust = 0;
    this.maxThrust = 2000;

  }

  update(x, y) {
    // this.x = x;
    // this.y = y;

  }
  addThrust() {
    if (this.thrust < this.maxThrust) {
      this.thrust += 10;
    }
    console.log(this.thrust);
  }

  getAngle() {

  }

  fire(x, y, angle, direction) {
    new Projectile({
      scene: this.scene,
      key: 'bullet',
      x: x,
      y: y,
      force: this.thrust,
      angle: angle,
      direction: direction
    })
    this.thrust = 0;

    // this.projectiles
    // console.log(this.projectiles.children.entries[0].body);
    // this.projectiles.children.entries[0].body.setVelocityX(thrust);
    // this.projectiles.each.setVelocityY(-500);
  }


}
