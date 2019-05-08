import React, { useEffect } from 'react';

import createGame from './index';

const GameCanvas = () => {
  useEffect(() => {
    createGame();
  }, []);

  return <div id="game" />;
};

export default GameCanvas;
