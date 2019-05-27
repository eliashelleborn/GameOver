import Player from './Player';

class Game {
  constructor(id, host, testing) {
    this.id = id;
    this.host = host;
    this.status = testing ? 'test' : 'lobby'; // 'lobby', 'playing', 'test', 'ended'
    this.players = [];
    this.testing = testing;

    this.settings = {
      turnTime: 35,
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
      status: 'countdown', // 'countdown', 'playing', 'paused'
    };
  }

  // Pause & resume turn
  pauseTurn(reason) {
    if (reason === 'shot') {
      this.turn.hasShot = true;
    }
    if (this.turn.status === 'playing') {
      clearInterval(this.timer);
      this.turn.status = 'paused';
      this.turn.canMove = false;
    }
  }

  resumeTurn(tickEvent) {
    if (this.turn.status !== 'playing') {
      this.turn.status = 'playing';
      this.turn.canMove = true;

      if (this.turn.hasShot) {
        this.turn.timeLeft = this.turn.timeLeft <= 5 ? this.turn.timeLeft : 5;
      }

      this.timer = setInterval(() => {
        tickEvent(this);
        if (this.turn.timeLeft === 0) {
          clearInterval(this.timer);
          this.endTurn(tickEvent);
        }
        this.turn.timeLeft -= 1;
      }, 1000);
    }
  }

  // Initiate game
  startGame(tickEvent) {
    this.status = 'playing';
    this.nextTurnCountdown(tickEvent);
  }

  // Set info about upcoming turn
  prepareNextTurn() {
    if (!this.turn.playerId) {
      this.turn.playerId = this.players[0].id;
    } else {
      const alivePlayers = this.players.filter(p => p.alive || p.id === this.turn.playerId);
      const currentPlayerIndex = alivePlayers.map(p => p.id).indexOf(this.turn.playerId);
      if (currentPlayerIndex === alivePlayers.length - 1) {
        this.turn.playerId = alivePlayers[0].id;
      } else {
        this.turn.playerId = alivePlayers[currentPlayerIndex + 1].id;
      }
    }

    this.turn = {
      ...this.turn,
      canMove: true,
      hasShot: false,
    };
  }

  // Start countdown
  nextTurnCountdown(tickEvent) {
    this.turn.status = 'countdown';
    this.countdown = this.countdownTime;

    this.prepareNextTurn();

    this.timer = setInterval(() => {
      tickEvent(this);
      if (this.countdown === 0) {
        clearInterval(this.timer);
        this.startTurn(tickEvent);
      }
      this.countdown -= 1;
    }, 1000);
  }

  // Set status to playing and start timer
  startTurn(tickEvent) {
    this.turn.timeLeft = this.settings.turnTime;
    this.resumeTurn(tickEvent);
  }

  // Go back to the start of the turn cycle
  endTurn(tickEvent) {
    this.nextTurnCountdown(tickEvent);
  }

  endGame() {
    this.status = 'ended';
    this.pauseTurn();
  }

  // Handle players
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
