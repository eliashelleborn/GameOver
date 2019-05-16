class Player {
  constructor(id, name) {
    this.id = id; // Socket ID
    this.name = name;
    this.health = 100;
  }
  takeDamage(damage) {
    this.health -= damage;
  }
}

export default Player;
