export default (io, socket, dataStore) => {
  // MOVEMENT
  socket.on('player start move', (direction) => {
    // STORE GAMEID ON SOCKET??? Instead of fetching it everytime
    const game = dataStore.findGameByPlayer(socket.id);
    socket.to(game.host).emit('player start move', socket.id, direction);
  });
  socket.on('player stop move', () => {
    const game = dataStore.findGameByPlayer(socket.id);
    socket.to(game.host).emit('player stop move', socket.id);
  });
  socket.on('player jump', () => {
    const game = dataStore.findGameByPlayer(socket.id);
    socket.to(game.host).emit('player jump', socket.id);
  });

  // WEAPON
  socket.on('player start shoot', () => {
    const game = dataStore.findGameByPlayer(socket.id);
    socket.to(game.host).emit('player start shoot', socket.id);
  });
  socket.on('player release shoot', () => {
    const game = dataStore.findGameByPlayer(socket.id);
    socket.to(game.host).emit('player release shoot', socket.id);
  });
  socket.on('player aim', (angle) => {
    const game = dataStore.findGameByPlayer(socket.id);
    socket.to(game.host).emit('player aim', socket.id, angle);
  });

  // DAMAGE
  socket.on('player health update', (healthChange, id) => {
    const game = dataStore.findGameByPlayer(socket.id);
    const player = game.findPlayer(id);
    player.updateHealth(healthChange);
    io.to(`game ${game.id}`).emit('player health update', player.id, player.health);
  });

  // DEATH
  socket.on('player dies', (id) => {
    const game = dataStore.findGameByPlayer(socket.id);
    const player = game.findPlayer(id);
    player.die();
    io.to(`game ${game.id}`).emit('player dies', player.id, player.alive);
  });
};
