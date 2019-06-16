import Phaser from 'phaser';
import Explosion from '../../Explosion';
import Cluster from './Cluster';

export default class ClusterBombProjectile extends Phaser.GameObjects.Sprite {
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
      config.angle,
    );
    // Adding Projectile to scene
    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setSize(12, 12);
    this.body.setBounce(0.7);
    this.timer = 5000;

    // Movement values
    this.dx = config.dx;
    this.dy = config.dy;
    this.direction = config.direction;
    this.angle = config.angle;
    this.thrust = config.force;

    // Rotation
    this.rotation = -config.angle;
    this.body.angularVelocity = config.force * config.dx;

    // Defining animation
    this.anims.play(config.key);

    // Making camera follow Projectile
    this.scene.cameras.main.startFollow(this);

    // Adding Collision
    this.scene.physics.add.collider(this, this.scene.players);
    this.scene.physics.add.collider(this, this.scene.layers);
    this.scene.physics.add.collider(this, this.scene.crates);

    // Adding the amount of damage
    this.damage = config.damage;

    // Moving the projectile
    this.body.setVelocityX(config.force * config.dx);
    this.body.setVelocityY(config.force * -config.dy);
    this.body.setFrictionX(0.5);

    // Map size
    this.mapWidth = this.scene.map.widthInPixels;
    this.mapHeight = this.scene.map.heightInPixels;

    this.isInBounds = true;
    this.canExplode = true;

    // Fixing fireing poisition
    this.x = config.x + (5 * config.direction);
    this.y = config.y - 10;

    // Number of clusters
    this.numberOfClusters = 4;
    this.clusters = [];

    setTimeout(() => this.explode(), this.timer);
  }

  explode() {
    if (this.canExplode) {
      this.canExplode = false;
      for (let index = 0; index < this.numberOfClusters; index += 1) {
        const cluster = new Cluster({
          scene: this.scene,
          key: 'cluster',
          x: this.x,
          y: this.y,
          force: 400,
          dx: -1 + (index * 0.5),
          dy: 1,
          damage: this.damage,
          direction: this.direction,
          angle: this.angle,
        });
        this.clusters.push(cluster);
      }


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
    // CHECK IF OUT OF BOUNDS
    if (this.x > this.mapWidth
      || this.y > this.mapHeight
      || this.x < 0) {
      if (this.isInBounds) {
        this.isInBounds = false;
        this.outOfBounds();
      }
    }
    if (this.canExplode && this.body.onFloor()) {
      this.body.setDragX(400);
      this.body.angularVelocity = this.body.velocity.x;
    } else if (this.canExplode) {
      this.body.setDragX(10);
    }
  }

  outOfBounds() {
    this.canExplode = false;
    this.scene.cameras.main.startFollow(this.scene.activePlayer);
    this.scene.socket.emit('resume turn', this.scene.gameState.id);
    this.destroy();
  }
}
