import Weapons from './Weapons';

class Player {
  constructor(id, name) {
    this.id = id; // Socket ID
    this.name = name;
    this.health = 100;
    this.alive = true;
    this.weapons = new Weapons();
    this.inventory = this.weapons.list;

    this.connected = true;
    this.colors = [
      'blue', 'green', 'red', 'purple', 'yellow', 'darkblue', 'turquoise', 'grey',
    ];
    this.color = this.colors[
      Math.floor(Math.random() * this.colors.length)
    ]; // blue, green, red, purple, yellow, darkblue, turquoise
  }

  updateHealth(healthChange) {
    this.health += healthChange;
    if (this.health < 0) this.health = 0;
  }

  die() {
    this.alive = false;
  }

  pickUpItem(item) {
    let alreadyInInventory = false;
    this.inventory.forEach((inventoryItem, index) => {
      if (item.key === inventoryItem.key) {
        this.inventory[index].ammo += item.ammo;
        alreadyInInventory = true;
      }
    });
    if (!alreadyInInventory) {
      this.inventory.push(item);
    }
  }

  loseAmmo(weapon) {
    this.inventory.forEach((inventoryItem, index) => {
      if (inventoryItem.key === weapon.key) {
        this.inventory[index].ammo -= 1;

        if (this.inventory[index].ammo < 1) {
          this.inventory.splice(index, 1);
        }
      }
    });
  }
}

export default Player;
