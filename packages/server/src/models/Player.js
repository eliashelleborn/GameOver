class Player {
  constructor(id, name) {
    this.id = id; // Socket ID
    this.name = name;
    this.health = 100;
    this.alive = true;
  }
  updateHealth(healthChange) {
    this.health += healthChange;
  }
  die() {
    this.alive = false;
  }
}

export default Player;
