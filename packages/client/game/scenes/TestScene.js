import Phaser from 'phaser';
import Player from '../sprites/Player';
import store from '../../app/store';

class TestScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TestScene',
    });
  }

  create() {
    this.gameState = store.getState().game.game;
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
    this.socket.on('player joined', (p) => {
      const startX = Math.floor(Math.random() * (600 - 300) + 300);
      const startY = this.map.heightInPixels - 550;
      const player = new Player({
        scene: this,
        key: this.arrayOfGhost[1],
        x: startX,
        y: startY,
        info: {
          id: p.id,
          name: p.name,
        },
      });
      this.players.add(player);
    });

    this.socket.on('player left', (p) => {
      const [player] = this.players.getChildren().filter(i => i.id === p.id);
      player.die();
    });

    // Making it Player Ones Turn
    this.playersTurn = this.gameState.players[0].id;
    this.activePlayer = this.players.getFirst(true);

    // Making the group players collide with tileset
    this.physics.add.collider(this.players, this.groundLayer);

    // // Property collide set in TILED on Tileset
    this.groundLayer.setCollisionByProperty({
      collide: true,
    });

    // CAMERA SETTINGS (outsideX, outsideY, MaxWidth, MaxHeight )
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    /* this.cameras.main.setViewport(0, 0, window.innerWidth, window.innerHeight); */
    this.cameras.main.setZoom(1.4);
    this.cameras.main.roundPixels = true;

    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // Making camera following the player
    this.cameras.main.startFollow(this.activePlayer);
  }

  update() {
    this.players.getChildren().forEach((p) => {
      p.update();
    });
  }

  changeTurn() {
    // Checking if we reached the end of the players
    if (this.playersTurn < this.numberOfPlayers - 1) {
      this.playersTurn += 1;
    } else {
      // Player 1 turn again
      this.playersTurn = 0;
    }

    // Setting active player
    this.activePlayer = this.players.children.entries[this.playersTurn];
    this.cameras.main.startFollow(this.activePlayer);
    this.players.children.entries.forEach((player) => {
      player.isItMyTurn(this.playersTurn);
      player.update(this.keys);
    });
  }
}

export default TestScene;
