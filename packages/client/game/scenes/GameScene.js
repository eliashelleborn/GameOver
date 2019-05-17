import Phaser from 'phaser';
import Player from '../sprites/Player';
import store from '../../app/store';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
    });
  }

  getGameState() {
    this.gameState = store.getState().game.game;
  }

  create() {
    this.getGameState();
    this.socket = store.getState().socket.socket;

    this.arrayOfGhost = ['blue', 'green', 'red'];
    this.numberOfPlayers = this.gameState.players.length;
    // MAP
    this.map = this.make.tilemap({
      key: 'map',
    });

    this.groundTiles = this.map.addTilesetImage('cliffs');
    this.groundLayer = this.map.createDynamicLayer('cliffs', this.groundTiles, 0, 0);

    // PLAYER
    // Creating number of players and adding them to group

    this.players = this.add.group();
    this.gameState.players.forEach((p) => {
      // Randomize Starting Position
      const startX = 600;
      const startY = this.map.heightInPixels - 750;
      const player = new Player({
        scene: this,
        key: this.arrayOfGhost[0],
        x: startX,
        y: startY,
        info: {
          id: p.id,
          name: p.name,
        },
      });
      this.players.add(player);
    });

    // SOCKET EVENTS
    // TURN
    this.socket.on('prepare turn', (turn) => {
      store.dispatch.game.updateTurn(turn);
      this.getGameState();
    });
    this.socket.on('start turn', (turn) => {
      store.dispatch.game.updateTurn(turn);
      this.getGameState();
    });
    this.socket.on('end turn', () => {});
    this.socket.on('countdown', (time, status) => {
      store.dispatch.game.setTimer(time);
    });

    this.socket.on('player left', (p) => {
      console.log('player left');
      /* const [player] = this.players.getChildren().filter(i => i.id === p.id);
      player.die(); */
    });

    // Making it Player Ones Turn
    this.playersTurn = this.gameState.players[0].id;
    this.activePlayer = this.players.getFirst(true);

    // Looping through players to make them collide with tileset
    this.players.children.entries.forEach((player) => {
      this.physics.add.collider(player, this.groundLayer);
    });

    // // Property collide set in TILED on Tileset
    this.groundLayer.setCollisionByProperty({
      collide: true,
    });

    // CAMERA SETTINGS (outsideX, outsideY, MaxWidth, MaxHeight )
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    /* this.cameras.main.setViewport(0, 0, window.innerWidth, window.innerHeight); */
    this.cameras.main.setZoom(1.2);

    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // Making camera following the player
    this.cameras.main.startFollow(this.activePlayer);

    // Creating a timer display
    this.timerText = this.make.text({
      x: 2, // this.activePlayer.x,
      y: 2, // this.activePlayer.y - 50,
      text: 'Timer',
      style: {
        fontSize: '32px',
        fill: '#D00',
      },
    });

  }

  update() {
    this.players.getChildren().forEach((p) => {
      p.update();
    });
  }
}

export default GameScene;
