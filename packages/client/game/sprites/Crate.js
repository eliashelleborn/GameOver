import Phaser from 'phaser';

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

    // List of all weapons

    // Collider to players
    this.scene.players.getChildren().forEach((p) => {
      this.scene.physics.add.overlap(this, p, (a, b) => this.collected(a, b));
    });

    // What it includes
    this.content = config.content;
    this.content.ammo = Phaser.Math.Between(1, this.content.maxLoot);

    this.isCollectable = true;
  }

  collected(crate, player) {
    if (this.isCollectable) {
      player.pickUpItem(crate.content);
      this.isCollectable = false;
    }
    this.destroy();
  }
}
