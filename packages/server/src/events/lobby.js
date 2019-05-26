export default (io, socket, dataStore) => {
  // HOST GAME
  socket.on('host game', () => {
    const game = dataStore.createGame({ host: socket.id });

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
    if (game && game.status === 'lobby') {
      const newPlayer = game.addPlayer(socket.id, name);

      socket.join(`game ${game.id}`);
      socket.to(`game ${game.id}`).emit('player joined', newPlayer);
      socket.emit('join game', game);
      return;
    }

    socket.emit('join game failed');
  });

  // UPDATE PLAYER INFO
  socket.on('lobby update player', (key, value) => {
    const game = dataStore.findGameByPlayer(socket.id);
    if (game.status === 'lobby') {
      const player = game.findPlayer(socket.id);
      player[key] = value;
      socket.to(`game ${game.id}`).emit('lobby update player', player);
    }
  });

  // LEAVE GAME / DISCONNECT
  const handleLeave = () => {
    const gameByHost = dataStore.findGameByHost(socket.id);
    if (gameByHost) {
      clearInterval(gameByHost.timer);
      dataStore.removeGame(gameByHost.id);
      // Notify players
      socket.to(`game ${gameByHost.id}`).emit('game deleted', gameByHost.players);
      // Leave room (socketio room)
      socket.leave(`game ${gameByHost.id}`);
      // Make all other players leave room
      gameByHost.players.forEach((p) => {
        if (p.id !== socket.id && p.connected) {
          io.sockets.sockets[p.id].leave(`game ${gameByHost.id}`);
        }
      });
    }

    const gameByPlayer = dataStore.findGameByPlayer(socket.id);
    if (gameByPlayer) {
      // const removedPlayer = gameByPlayer.removePlayer(socket.id);
      const disconnectedPlayer = gameByPlayer.findPlayer(socket.id);
      socket.to(`game ${gameByPlayer.id}`).emit('player left', disconnectedPlayer);
      socket.leave(`game ${gameByPlayer.id}`);

      if (gameByPlayer.status === 'lobby') {
        gameByPlayer.removePlayer(disconnectedPlayer.id);
      } else {
        disconnectedPlayer.die();
        disconnectedPlayer.connected = false;
        io.to(`game ${gameByPlayer.id}`).emit(
          'player dies',
          disconnectedPlayer.id,
          disconnectedPlayer.alive,
        );
      }
    }
  };

  socket.on('leave game', () => {
    handleLeave();
  });

  socket.on('disconnect', () => {
    handleLeave();
  });
};
