class Player {
  constructor(id, name) {
    this.id = id; // Socket ID
    this.name = name;
    this.health = 20;
    this.alive = true;
  }

  updateHealth(healthChange) {
    this.health += healthChange;
    console.log(this.health);
  }

  die() {
    this.alive = false;
  }
}

export default Player;
