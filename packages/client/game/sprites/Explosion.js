import Phaser from 'phaser';

export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.anims.play(config.key);
    this.scene.add.existing(this);
    this.scene.cameras.main.startFollow(this);
    this.scene.physics.world.enable(this);
    this.hasHurt = false;
    this.body.setAllowGravity(false);

    // Setting damage and correlating Scale
    this.damage = config.damage;
    this.scale = 5 * (config.damage / 100);
    this.setScale(this.scale);

    // Collider to players
    this.scene.physics.add.collider(this, this.scene.players, (a, b) => this.hitPlayer(a, b));

    // Getting all hit tiles and changing values to -1
    const hitTiles = this.scene.map.getTilesWithinShape(
      new Phaser.Geom.Circle(
        this.x,
        this.y,
        (this.width / 2) * this.scale,
      ),
    );
    hitTiles.forEach((tile) => {
      this.scene.map.putTileAt(-1, tile.x, tile.y);
    });

    // Timing destroy with end of animation
    setTimeout(() => this.explode(this.scene), 650);
  }

  explode(scene) {
    scene.cameras.main.startFollow(scene.activePlayer);
    this.destroy();
  }

  hitPlayer(explosion, player) {
    // Calculating the damage
    const distance = Phaser.Math.Distance.Between(player.x, player.y, explosion.x, explosion.y);
    const updatedDamage = Math.round(this.damage - distance);

    if (!this.hasHurt) {
      player.takeDamage(updatedDamage);
      setTimeout(player.flyFromExplosion(explosion, updatedDamage), 100);
      this.hasHurt = true;
    }
  }
}
