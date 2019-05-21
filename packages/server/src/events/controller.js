export default (io, socket, dataStore) => {
  // MOVEMENT
  socket.on('player start move', (direction) => {
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
};
