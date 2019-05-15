export default (io, socket, dataStore) => {
  const countdownTick = (game) => {
    if (game.turn.status === 'countdown') {
      if (game.countdown === game.countdownTime) {
        io.to(`game ${game.id}`).emit('prepare turn', game.turn);
      }

      io.to(`game ${game.id}`).emit('countdown', game.countdown, game.turn.status);
    } else if (game.turn.status === 'playing') {
      if (game.turn.timeLeft === game.settings.turnTime) {
        io.to(`game ${game.id}`).emit('start turn');
      }
      if (game.turn.timeLeft === 0) {
        io.to(`game ${game.id}`).emit('end turn');
      }

      io.to(`game ${game.id}`).emit('countdown', game.turn.timeLeft, game.turn.status);
    }
  };

  // START GAME
  socket.on('start game', (id) => {
    const game = dataStore.findGame(id);
    if (game && game.host === socket.id) {
      game.status = 'playing';
      io.to(`game ${game.id}`).emit('start game', game);
      game.startGame(countdownTick);
    }
  });
};
