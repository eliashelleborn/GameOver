import Phaser from 'phaser';
import Player from '../sprites/Player';
import store from '../../app/store';

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
    });
  }

  create() {
    this.gameState = store.getState().game.game;

    this.arrayOfGhost = ['blue', 'green', 'red'];
    this.nextTurn = 50;
    this.timeLeft = this.nextTurn;
    this.switchCoolDown = 0;
    this.numberOfPlayers = this.gameState.players.length;
    // // BACKGROUND
    this.bg = this.add.tileSprite(800, 100, 2200, 1200, 'background');

    // MAP
    this.map = this.make.tilemap({
      key: 'map',
    });

    this.groundTiles = this.map.addTilesetImage('inca');
    this.groundLayer = this.map.createDynamicLayer('layer', this.groundTiles, 0, 0);

    // World bounds
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // PLAYER
    // Creating number of players and adding them to group
    this.players = this.add.group();
    this.gameState.players.forEach((p, i) => {
      // Randomize Starting Position
      const startX = Math.floor(Math.random() * this.map.widthInPixels);
      const startY = Math.floor(Math.random() * this.map.heightInPixels);
      const player = new Player({
        scene: this,
        key: this.arrayOfGhost[i],
        x: startX,
        y: startY,
        info: {
          id: p.id,
          name: p.name,
        },
      });
      this.players.add(player);
    });

    // Making it Player Ones Turn
    this.playersTurn = this.gameState.players[0].id;
    [this.activePlayer] = this.players.children.entries;

    // Looping through players to make them collide with tileset
    this.players.children.entries.forEach((player) => {
      this.physics.add.collider(player, this.groundLayer);
      // Stopping movement for everyone else
      player.isItMyTurn(this.playersTurn);
    });

    // // Property collide set in TILED on Tileset
    this.groundLayer.setCollisionByProperty({
      collide: true,
    });

    // CAMERA SETTINGS (outsideX, outsideY, MaxWidth, MaxHeight )
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    /* this.cameras.main.setViewport(0, 0, window.innerWidth, window.innerHeight); */
    this.cameras.main.setZoom(1.3);

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

  update(time) {
    // Defining the keys used in the game
    this.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown,
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown,
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown,
    };

    // Moving the player
    this.activePlayer.update(this.keys);

    this.getTimeLeft(time);
    this.displayTimer(time);
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

  getTimeLeft(time) {
    // Calculating time left of turn
    this.timeLeft = this.nextTurn - Math.round(time / 1000);
    if (this.timeLeft === 0) {
      this.changeTurn();
      // Setting the timer to next time it's ready for switch
      this.nextTurn = Math.round(time / 1000) + 10;
    }
  }

  displayTimer() {
    // Displaying time on screen
    this.timerText.setText(this.timeLeft);
  }
}

export default GameScene;
