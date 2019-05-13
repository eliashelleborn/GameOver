export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(config, time) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.anims.play(config.key);
    this.scene.add.existing(this);
    this.scene.cameras.main.startFollow(this);
    this.scene.physics.world.enable(this);
    this.hasHurt = false;
    this.body.setAllowGravity(false)

    this.timer = this.scene.time.now;
    this.damage = config.damage;
    this.scale = 5 * (config.damage / 100);
    this.setScale(this.scale);
    // console.log(this.scene.groundLayer);
    this.scene.physics.add.collider(this, this.scene.players, (a, b) => this.hitPlayer(a, b));
    console.log(this.x, this.y, this.width);
    let hitTiles = this.scene.map.getTilesWithinShape(new Phaser.Geom.Circle(this.x, this.y, this.width));
    console.log(hitTiles);
    hitTiles.forEach(tile => {
      console.log('tiles');
      this.scene.map.putTileAt(-1, tile.x, tile.y);
    });
    setTimeout(() => this.explode(this.scene), 650);

  }

  explode(scene) {

    scene.cameras.main.startFollow(scene.activePlayer);
    this.destroy();
  }

  hitPlayer(explosion, player) {
    // Calculating the damage
    // console.log(explosion, player);
    let distance = Phaser.Math.Distance.Between(player.x, player.y, explosion.x, explosion.y);
    let updatedDamage = this.damage - distance;

    if (!this.hasHurt) {
      player.takeDamage(updatedDamage);
      setTimeout(player.flyFromExplosion(explosion, updatedDamage), 100);
      this.hasHurt = true;
    }
  }

  hitGround(explosion, tile) {
    console.log('HIT GROUND');
    map.putTileAt(-1, tile.x, tile.y);
  }
}
