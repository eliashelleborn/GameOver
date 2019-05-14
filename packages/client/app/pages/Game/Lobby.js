import React from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';

const StyledLobby = styled.div``;

const Lobby = () => {
  const { socket } = useStore(state => state.socket);
  const { game } = useStore(state => state.game);

  const startGame = () => {
    socket.emit('start game', game.id);
  };

  return (
    <StyledLobby>
      {game && (
        <div>
          <h1>
            {'Game ID: '}
            {game.id}
          </h1>
          {game.host === socket.id && (
            <button type="button" onClick={startGame}>
              Start Game
            </button>
          )}
        </div>
      )}
      <ul>
        {game.players.map(player => (
          <li key={player.id}>
            {`${player.id} - ${player.name}`}
            {player.id === socket.id && <span> (me)</span>}
          </li>
        ))}
      </ul>
    </StyledLobby>
  );
};

export default Lobby;
