export default (io, socket, dataStore) => {
  const countdownTick = (game) => {
    // Handle Countdown
    if (game.turn.status === 'countdown') {
      if (game.countdown === game.countdownTime) {
        io.to(`game ${game.id}`).emit('prepare turn', game.turn);
      }

      io.to(`game ${game.id}`).emit('countdown', game.countdown, game.turn.status);
    }

    // Handle turn timer
    if (game.turn.status === 'playing') {
      if (game.turn.timeLeft === game.settings.turnTime) {
        io.to(`game ${game.id}`).emit('start turn', game.turn);
      }
      if (game.turn.timeLeft === 0) {
        io.to(`game ${game.id}`).emit('end turn');
      }

      // If only one player is left, end game
      const alivePlayers = game.players.filter(p => p.alive);
      if (alivePlayers.length <= 1) {
        game.endGame();
        io.to(`game ${game.id}`).emit('end game', game);
      }

      // If active player dies mid-turn, set time left to 0
      const [activePlayer] = game.players.filter(p => p.id === game.turn.playerId);
      if (!activePlayer.alive) {
        game.turn.timeLeft = 0;
      }

      io.to(`game ${game.id}`).emit('countdown', game.turn.timeLeft, game.turn.status);
    }
  };

  socket.on('start game', (id) => {
    const game = dataStore.findGame(id);
    if (game && game.host === socket.id) {
      game.status = 'playing';
      io.to(`game ${game.id}`).emit('start game', game);
      game.startGame(countdownTick);
    }
  });

  socket.on('resume turn', (id) => {
    const game = dataStore.findGame(id);
    if (game && game.host === socket.id) {
      game.resumeTurn(countdownTick);
      io.to(`game ${game.id}`).emit('resume turn', game.turn);
    }
  });

  socket.on('pause turn', (id, reason) => {
    const game = dataStore.findGame(id);
    if (game && game.host === socket.id) {
      game.pauseTurn(reason);
      io.to(`game ${game.id}`).emit('pause turn', game.turn);
    }
  });

  // PLAYER STATE
  socket.on('player health update', (healthChange, id) => {
    const game = dataStore.findGameByPlayer(id);
    const player = game.findPlayer(id);
    player.updateHealth(healthChange);
    io.to(`game ${game.id}`).emit('player health update', player.id, player.health);

    if (player.health <= 0) {
      player.die();
      io.to(`game ${game.id}`).emit('player dies', player.id, player.alive);
    }
  });

  // PLAYER PICK UP ITEM
  socket.on('player pick up item', (item, id) => {
    console.log(item, id);
    const game = dataStore.findGameByPlayer(id);
    const player = game.findPlayer(id);
    player.pickUpItem(item);
  });
};
