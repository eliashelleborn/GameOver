import React from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import Timer from './Timer';

const StyledGameUI = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
`;

const GameUI = (props) => {
  const { game } = useStore(state => state.game);
  return (
    <StyledGameUI>
      <Timer />
    </StyledGameUI>
  );
};

export default GameUI;
