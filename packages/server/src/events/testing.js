export default (io, socket, dataStore) => {
  // JOIN OR HOST GAME
  socket.on('join/host test-game', () => {
    let game = dataStore.findGame('test');

    if (!game) {
      game = dataStore.createGame({ host: socket.id, testing: true });
    }

    const name = game.players.length === 0 ? 'Host' : `P${game.players.length}`;
    const newPlayer = game.addPlayer(socket.id, name);

    socket.to('game test').emit('player joined', newPlayer);
    socket.join('game test');
    socket.emit('join game', game);
  });
};
