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

    // =============================================== \\
    // ===== MAP, BACKGROUND AND SPAWNING POINTS ===== \\
    // =============================================== \\

    // Map
    this.map = this.make.tilemap({
      key: 'map',
    });

    // Background
    this.bg = this.add.tileSprite(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2, 'background');

    // Getting spawn points
    this.spawnPoints = [];
    this.spawnPoints.push(this.map.findObject("start", obj => obj.name === "spawn1"));
    this.spawnPoints.push(this.map.findObject("start", obj => obj.name === "spawn2"));
    this.spawnPoints.push(this.map.findObject("start", obj => obj.name === "spawn3"));
    this.spawnPoints.push(this.map.findObject("start", obj => obj.name === "spawn4"));
    this.spawnPoints.push(this.map.findObject("start", obj => obj.name === "spawn5"));
    this.spawnPoints.push(this.map.findObject("start", obj => obj.name === "spawn6"));
    this.spawnPoints.push(this.map.findObject("start", obj => obj.name === "spawn7"));
    this.spawnPoints.push(this.map.findObject("start", obj => obj.name === "spawn8"));
    this.spawnPoints.push(this.map.findObject("start", obj => obj.name === "spawn9"));
    this.spawnPoints.push(this.map.findObject("start", obj => obj.name === "spawn10"));

    // =================== \\
    // ===== PLAYERS ===== \\
    // =================== \\

    // Creating number of players and adding them to a group
    this.players = this.add.group();
    this.gameState.players.forEach((p) => {
      // Randomize Spawn Position
      const randomNumber = Phaser.Math.Between(0, this.spawnPoints.length - 1)
      const spawnPoint = this.spawnPoints[randomNumber];

      const player = new Player({
        scene: this,
        key: this.arrayOfGhost[0],
        x: spawnPoint.x,
        y: spawnPoint.y,
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

    // ===================================== \\
    // ===== TILE LAYERS AND COLLISION ===== \\
    // ===================================== \\

    this.groundTiles = this.map.addTilesetImage('cliffs');
    this.layers = this.add.group();

    // Getting layers from Tile map
    this.backLayer = this.map.createDynamicLayer('back', this.groundTiles, 0, 0);
    this.groundLayer = this.map.createDynamicLayer('cliffs', this.groundTiles, 0, 0);
    this.topLayer = this.map.createDynamicLayer('top', this.groundTiles, 0, 0);
    this.layers.add(this.groundLayer);
    this.layers.add(this.backLayer);
    this.layers.add(this.topLayer);

    // Add collision between players and layers
    this.physics.add.collider(this.players, this.layers);

    // // Property collide set in TILED on Tileset
    this.groundLayer.setCollisionByProperty({
      collide: true,
    });
    this.backLayer.setCollisionByProperty({
      collide: true,
    });
    this.topLayer.setCollisionByProperty({
      collide: true,
    });



    // CAMERA SETTINGS (outsideX, outsideY, MaxWidth, MaxHeight )
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    /* this.cameras.main.setViewport(0, 0, window.innerWidth, window.innerHeight); */
    this.cameras.main.setZoom(1.5);

    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // Making camera following the player
    this.cameras.main.startFollow(this.activePlayer);

  }

  update() {
    this.players.getChildren().forEach((p) => {
      p.update();
    });
  }
}

export default GameScene;
