import React from 'react';
import { useStore } from 'easy-peasy';
import GameCanvas from '../../game/GameCanvas';

const Game = () => {
  const socket = useStore(state => state.socket.socket);
  return <div>{socket && <GameCanvas />}</div>;
};

export default Game;
