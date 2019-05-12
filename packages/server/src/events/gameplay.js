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
};
