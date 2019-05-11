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
  socket.on('join game', ({ id, name }) => {
    const game = dataStore.findGame(id);

    if (game) {
      game.addPlayer(socket.id, name);

      socket.join(`game ${game.id}`);
      socket.to(`game ${game.id}`).emit('players updated', game.players);
      socket.emit('join game', game);
      return;
    }

    socket.emit('join game failed');
  });

  // LEAVE GAME / DISCONNECT
  const handleLeave = () => {
    const gameByHost = dataStore.findGameByHost(socket.id);
    if (gameByHost) {
      dataStore.removeGame(gameByHost.id);
      // Notify players
      socket.to(`game ${gameByHost.id}`).emit('game deleted', gameByHost.players);
      // Leave room (socketio room)
      socket.leave(`game ${gameByHost.id}`);
      // Make all other players leave room
      gameByHost.players.forEach((p) => {
        io.sockets.sockets[p.id].leave(`game ${gameByHost.id}`);
      });
    }

    const gameByPlayer = dataStore.findGameByPlayer(socket.id);
    if (gameByPlayer) {
      gameByPlayer.removePlayer(socket.id);
      socket.to(`game ${gameByPlayer.id}`).emit('players updated', gameByPlayer.players);
      socket.leave(`game ${gameByPlayer.id}`);
    }
  };

  socket.on('leave game', () => {
    handleLeave();
  });

  socket.on('disconnect', () => {
    handleLeave();
  });

  // START GAME
  socket.on('start game', (id) => {
    const game = dataStore.findGame(id);
    if (game && game.host === socket.id) {
      game.startGame();
      io.to(`game ${game.id}`).emit('start game', game);
    }
  });
};
