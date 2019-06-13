import Phaser from 'phaser';

import controllerEvents from './events';
import Crosshair from '../Crosshair';
import Bazooka from '../Weapons/Bazooka';
import GrenadeLauncher from '../Weapons/GrenadeLauncher';

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
    this.body.setDragX(100);

    this.availableWeapons = {
      Bazooka,
      GrenadeLauncher,
    };

    this.inventory = config.info.inventory;
    this.faceDirection = 'right';
    this.alive = true;
    this.canMove = true;
    this.health = config.info.health;
    this.direction = 1;
    this.velocity = {
      x: 80,
      y: -450,
    };
    this.myTurn = false;
    this.animations = {
      left: `${config.info.color}-left`,
      right: `${config.info.color}-right`,
      standLeft: `${config.info.color}-standLeft`,
      standRight: `${config.info.color}-standRight`,
      dead: `${config.info.color}-dead`,
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
    this.anims.play(this.animations.standLeft);

    // ===== CROSSHAIR =====
    this.crosshair = new Crosshair({
      scene: this.scene,
      key: 'crosshair',
      x: this.x,
      y: this.y,
    }).setDepth(1);
    this.crosshair.visible = false;
    // console.log(this.inventory[0].type);
    // ===== WEAPON =====
    if (this.inventory.length > 1) {
      this.weapon = new this.availableWeapons[this.inventory[0].type]({
        scene: this.scene,
        key: this.inventory[0].key,
        x: this.x,
        y: this.y,
      });
    } else {
      this.weapon = {};
    }

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
    // console.log('player : ', this.controller.weapon.aim);
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
          if (this.controller.movement.speed > 1) {
            this.controller.movement.speed = 1;
          }
          this.run(this.velocity.x * this.controller.movement.direction * this.controller.movement.speed);
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
      } else {
        if (this.controller.movement.direction !== 0) {
          this.controller.movement.direction = 0;
          this.run(this.velocity.x * this.controller.movement.direction);
        }
        if (this.controller.weapon.fire && this.startFire) {
          this.controller.weapon.fire = false;
          this.startedFire = false;
          this.weapon.thrust = 0;
        }
      }
    } else {
      this.anims.play(this.animations.dead, true);
    }
    // Weapon
    if (Object.getOwnPropertyNames(this.weapon).length !== 0 && this.weapon.length !== 0) {
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
    this.weapon.fire(this.faceDirection === 'left' ? -1 : 1, this.controller.weapon.aim);
    this.scene.socket.emit('pause turn', this.scene.gameState.id, 'shot');
  }

  takeDamage(damage) {
    if (this.alive) {
      const message = {
        message: `You got ${damage} damage`,
        type: 'hurt',
      };
      this.scene.socket.emit('message to controller', this.id, message);
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
    this.disableBody();
    this.y -= 55;
    const message = {
      message: 'You died...',
      type: 'hurt',
    };
    this.scene.socket.emit('message to controller', this.id, message);
  }

  updateAlive(lifeStatus) {
    this.crosshair.destroy();
    this.weapon.destroy();
    this.alive = lifeStatus;
  }

  changeWeapon(weapon) {
    // Check if there is a weapon to destroy
    if (Object.getOwnPropertyNames(this.weapon).length !== 0 && this.weapon.length !== 0) {
      this.weapon.destroy();
    }

    if (weapon.length === 0) {
      this.weapon = {};
      return;
    }
    this.weapon = new this.availableWeapons[weapon.type]({
      scene: this.scene,
      key: weapon.key,
      x: this.x,
      y: this.y,
    });
  }

  pickUpItem(item, message) {
    this.scene.socket.emit('player pick up item', item, this.id);
    this.scene.socket.emit('message to controller', this.id, message);
  }
}
