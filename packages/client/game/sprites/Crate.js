import Phaser from 'phaser';

export default class Crate extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.key, config.x, config.y, config.includes);
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
    this.includes = config.includes;

    this.isCollectable = true;
  }

  collected(crate, player) {
    if (this.isCollectable) {
      console.log('collected crate');
      console.log(crate, player);
      player.pickUpItem(crate);
      this.isCollectable = false;
    }
    this.destroy();
  }
}
