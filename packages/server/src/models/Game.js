import Player from './Player';

class Game {
  constructor(id, host) {
    this.id = id;
    this.host = host;
    this.players = [];
  }

  addPlayer(id, name) {
    const player = new Player(id, name);
    this.players.push(player);
  }

  removePlayer(id) {
    const player = this.findPlayer(id);
    if (player) {
      this.players.splice(this.players.indexOf(player), 1);
    }
  }

  findPlayer(id) {
    return this.players.find(p => p.id === id);
  }
}

export default Game;
