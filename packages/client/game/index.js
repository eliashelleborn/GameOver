import Phaser from 'phaser';

// Scenes
import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: false
    }
  },
  scene: [
    BootScene,
    GameScene
  ]
};
let game
const createGame = () => {
   game = new Phaser.Game(config);
}
export default createGame;
