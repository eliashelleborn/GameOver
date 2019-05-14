import Phaser from 'phaser';
import Explosion from './Explosion';

export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.force,
      config.direction,
      config.dx,
      config.dy,
    );
    // Adding Projectile to scene
    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    // Defining animation
    this.anims.play(config.key);

    // Making camera follow Projectile
    this.scene.cameras.main.startFollow(this);

    // Adding Collision
    this.scene.physics.add.collider(this, this.scene.players, () => this.hitGround());
    this.scene.physics.add.collider(this, this.scene.groundLayer, () => this.hitGround());

    // Adding the amount of damage
    this.damage = config.damage;

    // Changing gravity
    this.body.setGravity(0, 0);

    // Moving the projectile
    this.body.setVelocityX(config.force * config.dx);
    this.body.setVelocityY(config.force * -config.dy);
  }

  hitGround() {
    this.explosion = new Explosion({
      scene: this.scene,
      x: this.x,
      y: this.y,
      key: 'explosion',
      damage: this.damage,
    });
    this.destroy();
  }
}
