import Player from '../sprites/Player.js'

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }
    preload() {
        
       
    }
    
    create() {
        
        const numberOfPlayers = 3;
        // // BACKGROUND
        this.bg = this.add.tileSprite(800, 100, 2200, 1200, 'background');

        // MAP
        this.map = this.make.tilemap({
            key: 'map'
        });
       
        this.groundTiles = this.map.addTilesetImage('inca');
        this.groundLayer = this.map.createDynamicLayer('layer', this.groundTiles, 0, 0);

        //PLAYER
        
        
        // Creating number of players and adding them to group
        this.players = this.add.group();
        for (let i = 0; i < numberOfPlayers; i++){
            // Randomize Starting Position
            let startX = Math.floor(Math.random() * this.map.widthInPixels);
            let startY = Math.floor(Math.random() * this.map.heightInPixels);
            let player = new Player({
              scene: this,
              key: 'blue',
              x: startX,
              y: startY,
            });
            console.log(player);
            this.players.add(player);
        }

        // Looping through players to make them collide with tileset
        this.players.children.entries.forEach(player => {
            this.physics.add.collider(player, this.groundLayer);
        });
        
        // // Property collide set in TILED on Tileset
        this.groundLayer.setCollisionByProperty({
            collide: true
        });

        // CAMERA SETTINGS (outsideX, outsideY, MaxWidth, MaxHeight )
        this.cameras.main.setBounds(0, 0, 100, this.map.heightInPixels);

        // Making it Player Ones Turn
        this.playersTurn = 1;
        this.activePlayer = this.players.children.entries[this.playersTurn-1];
        // Making camera following the player
        this.cameras.main.startFollow(this.activePlayer);

       
    }

    update() {
        // Defining the keys used in the game
        this.keys = {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown,
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown,
            jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown
        }

        // Moving the player
        this.activePlayer.update(this.keys);
        

        
    }
}

export default GameScene;