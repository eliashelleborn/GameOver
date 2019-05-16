class Player {
  constructor(id, name) {
    this.id = id; // Socket ID
    this.name = name;
    this.health = 100;
  }
  updateHealth(healthChange) {
    this.health += healthChange;
  }
}

export default Player;
