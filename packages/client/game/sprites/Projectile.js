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
      config.damage,
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
    this.scene.physics.add.collider(this, this.scene.layers, () => this.hitGround());

    // Adding the amount of damage
    this.damage = config.damage;
    // Changing gravity
    this.body.setGravity(0, 0);

    // Moving the projectile
    this.body.setVelocityX(config.force * config.dx);
    this.body.setVelocityY(config.force * -config.dy);

    // Map size
    this.mapWidth = this.scene.map.widthInPixels;
    this.mapHeight = this.scene.map.heightInPixels;

    this.isInBounds = true;
    this.canExplode = true;
  }

  hitGround() {
    if (this.canExplode) {
      this.canExplode = false;
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

  update() {
    if (this.x > this.mapWidth
      || this.y > this.mapHeight
      || this.x < 0) {
      if (this.isInBounds) {
        this.isInBounds = false;
        this.outOfBounds();
      }
    }
  }

  outOfBounds() {
    this.scene.cameras.main.startFollow(this.scene.activePlayer);
    this.scene.socket.emit('resume turn', this.scene.gameState.id);
    this.destroy();
  }
}
