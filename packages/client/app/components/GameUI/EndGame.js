import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';

const StyledEndGame = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 2rem;
  z-index: 100;

  > div {
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  h1 {
    span {
      color: ${({ theme }) => theme.colorPrimary};
    }
  }

  a {
    color: ${({ theme }) => theme.colorPrimary};
    margin-top: 1rem;
  }
`;

const EndGame = ({ visible, game }) => {
  const [winner] = game.players.filter(p => p.alive);
  const spring = useSpring({ opacity: visible ? 1 : 0 });
  return (
    <StyledEndGame style={spring}>
      <div>
        <h1>
          Game Ended!
          <br />
          <span>{winner.name}</span>
          {' won the game.'}
        </h1>
        <Link to="/">{'< Back to start'}</Link>
      </div>
    </StyledEndGame>
  );
};

export default EndGame;
