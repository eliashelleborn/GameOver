export default class Crosshair extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.key, config.x, config.y);
    this.scene = config.scene;
    // this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.anims.play(config.key)
    this.y = 0;
    this.x = 0;
    this.radius = 100;
    this.velocity = {
      y: 1,
      x: 1
    };
    this.distance = {
      x: this.radius,
      y: 0,
    }
    this.faceDirection = 'right';
  }


  update(keys, x, y) {


    if (keys.crosshair.up) {
      this.moveUp(x, y);
    } else if (keys.crosshair.down) {
      this.moveDown(x, y);
    }

    //
    if (keys.player.left) {
      this.x = x - this.distance.x
      this.faceDirection = 'left';
    } else if (keys.player.right) {
      this.x = x + this.distance.x
      this.faceDirection = 'right';
    }


    this.y = y + this.distance.y
    // this.angle = this.getAngle();
  }

  moveUp(x, y) {
    if (this.distance.y > -this.radius) {
      this.distance.y -= this.velocity.y;

      if (this.y < y) {
        this.distance.x -= this.velocity.x;
      } else {
        this.distance.x += this.velocity.x;
      }
      if (this.faceDirection === 'left') {
        this.x = x - this.distance.x
      } else {
        this.x = x + this.distance.x
      }
    }
  }
  moveDown(x, y) {
    if (this.distance.y < this.radius) {

      this.distance.y += this.velocity.y;

      if (this.y < y) {
        this.distance.x += this.velocity.x;
      } else {
        this.distance.x -= this.velocity.x;
      }
      if (this.faceDirection === 'left') {
        this.x = x - this.distance.x
      } else {
        this.x = x + this.distance.x
      }
    }
  }
  standStill() {

  }
  getAngle() {
    // Math for  
  }

  startTurnPosition(x, y) {
    this.y = y;
    this.x = x + this.radius;
    this.distance.x = this.radius;
    this.distance.y = 0;

  }
}
