import Phaser from 'phaser';
import Player from '../sprites/Player';
import Crate from '../sprites/Crate';

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
    this.bgSky = this.add
      .tileSprite(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2, 'background-sky')
      .setScrollFactor(0.2, 0.5);
    this.bgSea = this.add
      .tileSprite(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2, 'background-sea')
      .setScrollFactor(0.5, 0.5);

    // Getting spawn points
    this.spawnPoints = [];
    // this.map.fin;
    this.map.findObject('start', (obj) => {
      this.spawnPoints.push(obj);
    });

    // =================== \\
    // ===== PLAYERS ===== \\
    // =================== \\

    // Creating number of players and adding them to a group
    this.players = this.add.group();
    this.gameState.players.forEach((p) => {
      // Randomize Spawn Position
      const randomNumber = Phaser.Math.Between(0, this.spawnPoints.length - 1);
      const spawnPoint = this.spawnPoints[randomNumber];
      const player = new Player({
        scene: this,
        x: spawnPoint.x,
        y: spawnPoint.y,
        info: {
          id: p.id,
          name: p.name,
          color: p.color,

          inventory: p.inventory,
        },
      });
      this.players.add(player);
    });

    // SOCKET EVENTS
    // TURN
    const updateTurn = (turn) => {
      store.dispatch.game.updateTurn(turn);
      this.getGameState();
      this.dropCrate();
    };

    this.socket.on('prepare turn', (turn) => {
      updateTurn(turn);
      // Set active player
      const [player] = this.players
        .getChildren()
        .filter(i => i.id === this.gameState.turn.playerId);
      // Hide crosshair for previous player
      if (this.activePlayer) this.activePlayer.crosshair.visible = false;
      // Set new activePlayer
      this.activePlayer = player;
      // Show crosshair for new activePlayer
      this.activePlayer.crosshair.visible = true;
      // Making camera following the player
      this.cameras.main.startFollow(this.activePlayer);
    });
    this.socket.on('start turn', (turn) => {
      updateTurn(turn);
    });
    this.socket.on('end turn', () => {});
    this.socket.on('countdown', (time, status) => {
      store.dispatch.game.setTimer(time);
    });
    this.socket.on('resume turn', (turn) => {
      updateTurn(turn);
    });
    this.socket.on('pause turn', (turn) => {
      updateTurn(turn);
    });
    this.socket.on('player left', (p) => {
      console.log('player left');
      /* const [player] = this.players.getChildren().filter(i => i.id === p.id);
      player.die(); */
    });

    this.socket.on('end game', (game) => {
      store.dispatch.game.setGame(game);
      this.getGameState();
    });


    // ================== \\
    // ===== CRATES ===== \\
    // ================== \\

    this.crates = this.add.group();

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

    // Add collision between players, crates and layers
    this.physics.add.collider(this.players, this.layers);
    this.physics.add.collider(this.crates, this.layers);

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
    this.cameras.main.setZoom(1.5);

    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  }

  update() {
    this.players.getChildren().forEach((p) => {
      p.update();
    });
  }

  dropCrate() {
    // Random item from lists
    const includes = this.gameState.weapons.list[1];
    const crate = new Crate({
      scene: this,
      x: 500,
      y: 400,
      key: 'crate',
      includes,
    });
    this.crates.add(crate);
  }
}

export default GameScene;
