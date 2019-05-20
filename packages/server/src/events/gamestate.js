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
};
