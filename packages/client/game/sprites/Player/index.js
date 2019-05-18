import Phaser from 'phaser';
import Weapon from '../Weapon';

import controllerEvents from './events';
import Crosshair from '../Crosshair';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, config.info);
    this.id = config.info.id;
    this.name = config.info.name;
    this.scene = config.scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.scene.physics.add.collider(this.body, this.scene.layers);
    this.body.setBounce(0.3);
    this.body.setCollideWorldBounds(true);
    this.body.setFrictionX(1000);

    this.faceDirection = 'right';
    this.alive = true;
    this.canMove = true;
    this.health = config.info.health;
    this.direction = 1;
    this.velocity = {
      x: 150,
      y: -450,
    };
    this.myTurn = false;

    this.animations = {
      left: `${config.key}-left`,
      right: `${config.key}-right`,
      standLeft: `${config.key}-standLeft`,
      standRight: `${config.key}-standRight`,
    };

    this.controller = {
      movement: {
        direction: 0, // 0 = idle     -1 = left       +1 = right
        jump: false,
      },
      weapon: {
        fire: false,
        aim: 0,
      },
    };

    // ===== CROSSHAIR =====
    this.crosshair = new Crosshair({
      scene: this.scene,
      key: 'crosshair',
      x: this.x,
      y: this.y,
    });

    // ===== WEAPON =====
    this.weapon = new Weapon({
      scene: this.scene,
      key: 'bazooka',
      x: this.x,
      y: this.y,
    });

    // Initiate Controller event listeners
    controllerEvents(this.scene.socket, this);
    this.body.setImmovable(false);
  }

  update() {

    if (this.alive) {

      // ===== CONTROLLER =====
      if (
        this.id === this.scene.gameState.turn.playerId &&
        this.scene.gameState.turn.status === 'playing'
      ) {

        // Run
        if (this.canMove) {
          this.run(this.velocity.x * this.controller.movement.direction);
        }
        // Jump
        if (this.controller.movement.jump && this.body.onFloor()) {
          this.jump();
        }
        // Shoot
        if (this.controller.weapon.fire) {
          this.startFire();
        } else if (!this.controller.weapon.fire && this.startedFire) {
          this.fire();
        }
        // ===== ========== =====

        // FRICTION

        // Weapon
        if (this.weapon) {
          this.weapon.update(this.x, this.y);
        }



        // Update crosshair position
        this.crosshair.update(this.x, this.y, this.controller.weapon.aim);
      }
    }



    // Flying variable
    if (!this.canMove) {
      if (this.body.velocity.x > 0) {
        this.body.setVelocityX((this.body.velocity.x -= 1));
      } else if (this.body.velocity.x < 0) {
        this.body.setVelocityX((this.body.velocity.x += 1));
      }
      if (this.body.velocity.x < 1 && this.body.velocity.x > -1) {
        this.body.setVelocityX(0);
        this.canMove = true;
      }
    }
  }

  run(vel) {
    this.body.setVelocityX(vel);
    if (vel < 0) {
      this.faceDirection = 'left';
      this.anims.play(this.animations.left, true);
    } else if (vel > 0) {
      this.faceDirection = 'right';
      this.anims.play(this.animations.right, true);
    } else if (this.faceDirection === 'left') {
      this.anims.play(this.animations.standLeft);
    } else {
      this.anims.play(this.animations.standRight);
    }

  }

  jump() {
    this.body.setVelocityY(this.velocity.y);
    this.controller.movement.jump = false;
  }

  startFire() {
    this.weapon.addThrust();
    this.startedFire = true;
  }

  fire() {
    this.startedFire = false;
    this.weapon.fire(
      this.controller.movement.direction,
      this.controller.weapon.aim
    );
  }

  takeDamage(damage) {
    if (this.alive) {
      this.scene.socket.emit('player health update', -damage, this.id);
    }
  }

  flyFromExplosion(explosion, damage) {
    this.canMove = false;
    if (this.y < explosion.y) {
      this.body.setVelocityY(-(damage * 15));
    } else {
      this.body.setVelocityY(damage * 15);
    }
    if (this.x < explosion.x) {
      this.body.setVelocityX(-(damage * 15));
    } else {
      this.body.setVelocityX(damage * 15);
    }
  }

  updateHealth(health) {
    this.health = health;
    if (health < 0) {
      this.die();
    }
  }
  die() {
    this.scene.socket.emit('player dies', this.id);

  }
  updateAlive(lifeStatus) {
    this.crosshair.destroy();
    this.weapon.destroy();
    this.alive = lifeStatus;
  }
}
