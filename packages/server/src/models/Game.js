import Player from './Player';

class Game {
  constructor(id, host, testing) {
    this.id = id;
    this.host = host;
    this.status = testing ? 'test' : 'lobby'; // 'lobby' || 'playing' || 'test'
    this.players = [];
    this.testing = testing;
  }

  startGame() {
    this.status = 'playing';
  }

  addPlayer(id, name) {
    const player = new Player(id, name);
    this.players.push(player);
    return player;
  }

  removePlayer(id) {
    const player = this.findPlayer(id);
    if (player) {
      this.players.splice(this.players.indexOf(player), 1);
    }
    return player;
  }

  findPlayer(id) {
    return this.players.find(p => p.id === id);
  }
}

export default Game;
