export default (socket, player) => {
  socket.on('player start move', (playerId, direction) => {
    if (playerId === player.id) {
      player.controller.movement.direction = direction;
    }
  });
  socket.on('player stop move', (playerId) => {
    if (playerId === player.id) {
      player.controller.movement.direction = 0;
    }
  });
  socket.on('player jump', (playerId) => {
    if (playerId === player.id) {
      player.controller.movement.jump = true;
    }
  });
};
