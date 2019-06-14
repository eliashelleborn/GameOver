import Phaser from 'phaser';

export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.anims.play(config.key);
    this.scene.add.existing(this);
    this.scene.cameras.main.startFollow(this);
    this.scene.physics.world.enable(this);
    this.hasHurt = [];
    this.body.setAllowGravity(false);

    // Setting damage and correlating Scale
    this.damage = config.damage;
    this.scale = 7 * (config.damage / 100);
    this.setScale(this.scale);

    // Collider to players
    this.scene.players.getChildren().forEach((p) => {
      this.scene.physics.add.overlap(this, p, (a, b) => this.hitPlayer(a, b));
    });

    // Collider to crates
    this.scene.crates.getChildren().forEach((p) => {
      this.scene.physics.add.overlap(this, p, (a, b) => this.hitCrate(a, b));
    });

    // Getting all hit tiles and changing values to -1
    const hitTiles = this.scene.map.getTilesWithinShape(
      new Phaser.Geom.Circle(this.x, this.y, (this.width / 2) * this.scale),
    );

    hitTiles.forEach((tile) => {
      this.scene.groundLayer.putTileAt(-1, tile.x, tile.y);
      this.scene.backLayer.putTileAt(-1, tile.x, tile.y);
      this.scene.topLayer.putTileAt(-1, tile.x, tile.y);
    });

    // Timing destroy with end of animation
    setTimeout(() => this.explode(this.scene), 650);
  }

  explode(scene) {
    scene.cameras.main.startFollow(scene.activePlayer);
    this.scene.socket.emit('resume turn', this.scene.gameState.id);
    this.destroy();
  }

  hitPlayer(explosion, player) {
    if (!this.hasHurt.includes(player)) {
      // Calculating the damage
      const distance = Phaser.Math.Distance.Between(player.x, player.y, explosion.x, explosion.y);
      let updatedDamage = Math.round(this.damage - distance / this.scale);
      if (updatedDamage < 1) {
        updatedDamage = 1;
      }
      player.takeDamage(updatedDamage);
      player.flyFromExplosion(explosion, updatedDamage);
      this.hasHurt.push(player);
    }
  }

  hitCrate(explosion, crate) {
    if (!this.hasHurt.includes(crate)) {
      crate.explode();
      this.hasHurt.push(crate);
    }
  }
}
