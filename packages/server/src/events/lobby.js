export default (io, socket, dataStore) => {
  // HOST GAME
  socket.on('host game', () => {
    const game = dataStore.createGame(socket.id);

    if (game) {
      socket.join(`game ${game.id}`);
      socket.emit('join game', game);
      return;
    }

    socket.emit('host game failed');
  });

  // JOIN GAME
  socket.on('join game', ({ id }) => {
    const game = dataStore.findGame(id);

    if (game) {
      game.addPlayer(socket.id, 'placeholder-name');

      socket.join(`game ${game.id}`);
      socket.to(`game ${game.id}`).emit('players updated', game.players);
      socket.emit('join game', game);
      return;
    }

    socket.emit('join game failed');
  });

  // LEAVE GAME / DISCONNECT
  socket.on('leave game', () => {
    const game = dataStore.findGameByPlayer(socket.id);
    if (game) {
      game.removePlayer(socket.id);
      socket.to(`game ${game.id}`).emit('players updated', game.players);
    }
  });

  socket.on('disconnect', () => {
    const gameByHost = dataStore.findGameByHost(socket.id);
    if (gameByHost) {
      dataStore.removeGame(gameByHost.id);
    }

    const gameByPlayer = dataStore.findGameByPlayer(socket.id);
    if (gameByPlayer) {
      gameByPlayer.removePlayer(socket.id);
      socket.to(`game ${gameByPlayer.id}`).emit('players updated', gameByPlayer.players);
    }
  });
};
