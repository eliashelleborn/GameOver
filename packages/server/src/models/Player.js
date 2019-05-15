class Player {
  constructor(id, name) {
    this.id = id; // Socket ID
    this.name = name;
    this.alive = true;
    this.health = 100;
  }
}

export default Player;
