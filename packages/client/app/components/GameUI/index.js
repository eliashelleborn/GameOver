import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import TurnTimer from './TurnTimer';
import EndGame from './EndGame';

const StyledGameUI = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  > div {
    position: relative;
    width: 100%
    height: 100%;
  }
`;

const GameUI = (props) => {
  /* const { game } = useStore(state => state.game); */

  const [status, setStatus] = useState('playing');
  const game = {
    timer: 0,
    status,
    turn: {
      playerId: '1',
      status: 'playing',
    },
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
  };
  const [activePlayer] = game.players.filter(p => p.id === game.turn.playerId);
  return (
    <StyledGameUI>
      {/*     <button type="button" onClick={() => setStatus('ended')}>
        End game
      </button> */}
      <div>
        {game.turn.status === 'playing' && <TurnTimer time={game.timer} player={activePlayer} />}
        <EndGame visible={game.status === 'ended'} game={game} />
      </div>
    </StyledGameUI>
  );
};

export default GameUI;
