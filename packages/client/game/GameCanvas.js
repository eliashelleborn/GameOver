import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useActions } from 'easy-peasy';
import createGame from './index';

const GameCanvas = ({ testing }) => {
  const { enableTesting } = useActions(actions => actions.game);
  useEffect(() => {
    if (testing) {
      enableTesting();
    }

    createGame();
  }, []);

  return <div id="game" />;
};

GameCanvas.propTypes = {
  testing: PropTypes.bool,
};

GameCanvas.defaultProps = {
  testing: false,
};

export default GameCanvas;
