import Phaser from 'phaser';
import Explosion from './Explosion';

export default class Crate extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.key, config.x, config.y, config.content);
    this.scene = config.scene;
    this.anims.play(config.key);
    this.scene.add.existing(this);
    this.y = config.y;
    this.x = config.x;
    this.graphics = this.scene.add.graphics();
    this.scene.physics.world.enable(this);

    // Collider with other crates
    this.scene.physics.add.collider(this, this.scene.crates);

    // Exploding Values
    this.damage = 30;
    this.canExplode = true;

    // Collider to players
    this.scene.players.getChildren().forEach((p) => {
      this.scene.physics.add.overlap(this, p, (a, b) => this.collected(a, b));
    });

    // What it includes
    this.content = config.content;
    this.content.ammo = Phaser.Math.Between(1, this.content.maxLoot);

    // Variable stopping from multiple pick ups
    this.isCollectable = true;
  }

  collected(crate, player) {
    if (this.isCollectable) {
      const message = {
        message: `You picked up ${this.content.ammo} x ${this.content.name}`,
        type: 'pickup',
      };
      player.pickUpItem(crate.content, message);
      this.isCollectable = false;
    }
    this.destroy();
  }

  explode() {
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
}
