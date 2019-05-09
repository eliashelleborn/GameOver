import Projectile from './Projectile';

export default class Weapon extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.key);
    this.scene = config.scene;
    this.damage = 10;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

  }

  update(x, y) {
    // this.x = x;
    // this.y = y;

  }

  fire(x, y, force) {
    new Projectile({
      scene: this.scene,
      key: 'bullet',
      x: x + 50,
      y: y,
      force: force
    })

    // this.projectiles
    // console.log(this.projectiles.children.entries[0].body);
    // this.projectiles.children.entries[0].body.setVelocityX(thrust);
    // this.projectiles.each.setVelocityY(-500);
  }


}
