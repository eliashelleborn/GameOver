import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import TurnTimer from './TurnTimer';
import EndGame from './EndGame';
import NextTurnCountdown from './NextTurnCountdown';

const StyledGameUI = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  > div {

    width: 100%
    height: 100%;
  }

  button {z-index: 100; position: relative;}
`;

const GameUI = (props) => {
  const { game } = useStore(state => state.game);
  const [activePlayer] = game.players.filter(p => p.id === game.turn.playerId);
  return (
    <StyledGameUI>
      <div>
        {game.turn.status === 'playing' && <TurnTimer time={game.timer} player={activePlayer} />}
        <EndGame visible={game.status === 'ended'} game={game} />

        <NextTurnCountdown
          visible={activePlayer && game.turn.status === 'countdown'}
          timer={game.timer}
          player={activePlayer}
        />
      </div>
    </StyledGameUI>
  );
};

export default GameUI;
