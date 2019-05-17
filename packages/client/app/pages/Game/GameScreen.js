import React from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import GameCanvas from '../../../game/GameCanvas';

const StyledGameScreen = styled.div``;

const UI = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  color: red;
  padding: 2rem;
  h2 {
    margin: 0;
  }
`;

const GameScreen = () => {
  const { game } = useStore(state => state.game);
  return (
    <StyledGameScreen>
      <UI>
        <h2>
          {game.turn.status}
          {': '}
          {game.timer}
        </h2>
      </UI>
      <GameCanvas />
    </StyledGameScreen>
  );
};

export default GameScreen;
