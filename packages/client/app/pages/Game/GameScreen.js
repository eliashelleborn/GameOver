import React from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import GameCanvas from '../../../game/GameCanvas';
import GameUI from '../../components/GameUI';

const StyledGameScreen = styled.div``;

const GameScreen = () => (
  <StyledGameScreen>
    <GameUI />
    <GameCanvas />
  </StyledGameScreen>
);

export default GameScreen;
