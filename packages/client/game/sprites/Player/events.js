export default (socket, player) => {
  // MOVEMENT
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

  // WEAPON
  socket.on('player start shoot', (playerId) => {
    if (playerId === player.id) {
      player.controller.weapon.fire = true;
    }
  });
  socket.on('player release shoot', (playerId) => {
    if (playerId === player.id) {
      player.controller.weapon.fire = false;
    }
  });
};
