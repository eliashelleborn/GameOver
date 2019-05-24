import Phaser from 'phaser';

// Scenes
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import TestScene from './scenes/TestScene';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1000,
      },
      debug: false,
    },
  },
  scene: [BootScene, GameScene, TestScene],
};

const createGame = () => new Phaser.Game(config);
export default createGame;
