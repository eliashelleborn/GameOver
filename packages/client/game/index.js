import Phaser from 'phaser';

// Scenes
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000 },
      debug: false,
    },
  },
  scene: [BootScene, GameScene],
};

let game;
const createGame = () => {
  game = new Phaser.Game(config);
};
export default createGame;
