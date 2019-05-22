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
    }).setDepth(1);
    this.crosshair.visible = false;

    // ===== WEAPON =====
    this.weapon = new Weapon({
      scene: this.scene,
      key: 'bazooka',
      x: this.x,
      y: this.y,
    });

    // Initiate Controller event listeners
    controllerEvents(this.scene.socket, this);

    // Name tag
    this.nameText = this.scene.make.text({
      x: this.x - 25,
      y: this.y - 35,
      text: this.name,
      style: {
        fontSize: '14px',
        fill: '#FFF',
        fontFamily: 'Arial',
        backgroundColor: '#606060 ',
        shadow: {
          offsetX: 1,
          offsetY: 1,
          color: '#000',
          fill: true,
        },
      },
    });
  }

  update() {
    if (this.alive) {
      // ===== CHECK AIM DIRECTION ===== \\
      if (this.controller.weapon.aim > 1.5 && this.controller.weapon.aim < 4.7) {
        this.faceDirection = 'left';
      } else {
        this.faceDirection = 'right';
      }

      // ===== CONTROLLER ===== \\
      if (
        this.id === this.scene.gameState.turn.playerId
        && this.scene.gameState.turn.status === 'playing'
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
        if (this.controller.weapon.fire && !this.scene.gameState.turn.hasShot) {
          this.startFire();
        } else if (!this.controller.weapon.fire && this.startedFire) {
          this.fire();
        }
        // ===== ========== =====

        // FRICTION


        // Update crosshair position
        this.crosshair.update(this.x, this.y, this.controller.weapon.aim);
        // Show crosshair on active player
      }
    }
    // Weapon
    if (this.weapon) {
      this.weapon.update(this.x, this.y);
    }
    // Update name tag position
    this.nameText.x = this.x - this.nameText.width / 2;
    this.nameText.y = this.y - 35;

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
    this.weapon.fire(this.controller.movement.direction, this.controller.weapon.aim);
    this.scene.socket.emit('pause turn', this.scene.gameState.id, 'shot');
  }

  takeDamage(damage) {
    if (this.alive) {
      this.scene.socket.emit('player health update', -damage, this.id);
    }
  }

  flyFromExplosion(explosion, damage) {
    const angle = Phaser.Math.Angle.Between(explosion.x, explosion.y, this.x, this.y);
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    this.canMove = false;
    this.body.setVelocityY(damage * 13 * dy);
    this.body.setVelocityX(damage * 13 * dx);
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
