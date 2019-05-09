import React from 'react';
import styled from 'styled-components';
import GameCanvas from '../../../game/GameCanvas';

const StyledGameScreen = styled.div``;

const GameScreen = props => (
  <StyledGameScreen>
    <GameCanvas />
  </StyledGameScreen>
);

export default GameScreen;
