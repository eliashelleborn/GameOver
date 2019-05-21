import Player from './Player';

class Game {
  constructor(id, host, testing) {
    this.id = id;
    this.host = host;
    this.status = testing ? 'test' : 'lobby'; // 'lobby', 'playing', 'test', 'ended'
    this.players = [];
    this.testing = testing;

    this.settings = {
      turnTime: 20,
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
      /* const alivePlayers = this.players.filter(p => p.alive); */
      const currentPlayerIndex = this.players.map(p => p.id).indexOf(this.turn.playerId);
      if (currentPlayerIndex === this.players.length - 1) {
        this.turn.playerId = this.players[0].id;
      } else {
        this.turn.playerId = this.players[currentPlayerIndex + 1].id;
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
    const alivePlayers = this.players.filter(p => p.alive);
    if (alivePlayers.length <= 1) {
      this.endGame();
    } else {
      this.nextTurnCountdown(tickEvent);
    }
  }

  endGame() {
    console.log('end game');
    this.status = 'ended';
    if (this.timer) clearInterval(this.timer);
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
