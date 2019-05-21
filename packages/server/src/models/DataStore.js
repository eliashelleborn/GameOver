import { makeID } from '../utils/helpers';
import Game from './Game';

class DataStore {
  constructor(/* io */) {
    /*    this.io = io; */
    this.games = [];
  }

  createGame({ host, testing }) {
    let id = 'AAAA'; // makeID(4);
    if (this.findGame(id)) {
      return this.createGame();
    }

    if (testing) id = 'test';

    const game = new Game(id, host, testing || false, this.io);
    this.games.push(game);

    return game;
  }

  removeGame(id) {
    const game = this.findGame(id);
    if (game) {
      this.games.splice(this.games.indexOf(game), 1);
      return true;
    }

    return false;
  }

  findGame(id) {
    return this.games.find(g => g.id === id);
  }

  findGameByHost(host) {
    return this.games.find(g => g.host === host);
  }

  findGameByPlayer(id) {
    return this.games.find(g => g.findPlayer(id));
  }
}

export default DataStore;
