import Player from './Player';

class Game {
  constructor(id, host, testing) {
    this.id = id;
    this.host = host;
    this.status = testing ? 'test' : 'lobby'; // 'lobby' || 'playing' || 'test'
    this.players = [];
    this.testing = testing;

    this.settings = {
      turnTime: 5,
    };

    this.timer = null;

    this.countdownTime = 3;
    this.countdown = this.countdownTime;

    this.turn = {
      id: 0,
      playerId: null,
      timeLeft: this.settings.turnTime,
      hasShot: false,
      canMove: true,
      status: 'countdown', // 'countdown', 'playing', 'paused
    };
  }

  startGame(tickEvent) {
    this.status = 'playing';
    this.nextTurnCountdown(tickEvent);
  }

  prepareNextTurn() {
    if (!this.turn.playerId) {
      this.turn.playerId = this.players[0].id;
    } else {
      const alivePlayers = this.players.filter(p => p.alive);
      this.turn.playerId = alivePlayers.map(p => p.id).indexOf(this.turn.playerId) + 1;
    }

    this.turn = {
      ...this.turn,
      canMove: true,
      hasShot: false,
    };
  }

  nextTurnCountdown(tickEvent) {
    this.turn.status = 'countdown';
    this.countdown = this.countdownTime;

    this.prepareNextTurn();

    this.timer = setInterval(() => {
      tickEvent(this);
      if (this.countdown === 0) {
        clearInterval(this.timer);
        this.turn.status = 'playing';
        this.nextTurn(tickEvent);
      }
      this.countdown -= 1;
    }, 1000);
  }

  nextTurn(tickEvent) {
    this.turn.timeLeft = this.settings.turnTime;
    this.timer = setInterval(() => {
      tickEvent(this);
      if (this.turn.timeLeft === 0) {
        clearInterval(this.timer);
        this.endTurn(tickEvent);
      }
      this.turn.timeLeft -= 1;
    }, 1000);
  }

  endTurn(tickEvent) {
    this.nextTurnCountdown(tickEvent);
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
