export default (socket, player) => {
  // MOVEMENT
  socket.on('player start move', (playerId, direction, speed) => {
    if (playerId === player.id) {
      player.controller.movement.direction = direction;
      player.controller.movement.speed = speed;
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
  socket.on('player aim', (playerId, angle) => {
    if (playerId === player.id) {
      player.controller.weapon.aim = angle;
    }
  });

  // HEALTH
  socket.on('player health update', (playerId, health) => {
    if (playerId === player.id) {
      player.updateHealth(health);
    }
  });

  // DEATH
  socket.on('player dies', (playerId, lifeStatus) => {
    if (playerId === player.id) {
      player.updateAlive(lifeStatus);
    }
  });

  // CHANGE WEAPON
  socket.on('player select inventory item', (playerId, weaponNumber) => {
    if (playerId === player.id) {
      player.changeWeapon(weaponNumber);
    }
  });
};
