import React from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import Timer from './Timer';
import EndGame from './EndGame';

const StyledGameUI = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  > div {
    position: relative;
    width: 100%
    height: 100%;
  }
`;

const GameUI = (props) => {
  const { game } = useStore(state => state.game);
  /* const game = {
    players: [
      {
        id: '1',
        name: 'Sven',
        alive: true,
      },
      {
        id: '2',
        name: 'Greger',
        alive: false,
      },
    ],
  }; */
  return (
    <StyledGameUI>
      <div>
        {game.turn.status === 'playing' && <Timer time={game.timer} />}
        {game.status === 'ended' && <EndGame game={game} />}
      </div>
    </StyledGameUI>
  );
};

export default GameUI;
