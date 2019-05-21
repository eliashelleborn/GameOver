import React from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import RoomCode from '../../components/Lobby/RoomCode';
import LobbyBox from '../../components/Lobby/LobbyBox';
import Players from '../../components/Lobby/Players';
import GameInfo from '../../components/Lobby/GameInfo';

const StyledLobby = styled.div`
  padding: 2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Lobby = () => {
  const { socket } = useStore(state => state.socket);
  const { game } = useStore(state => state.game);

  const startGame = () => {
    socket.emit('start game', game.id);
  };

  return (
    <StyledLobby>
      <RoomCode gameId={game.id} />
      <LobbyBox>
        <Players players={game.players} />
        <GameInfo startGame={startGame} />
      </LobbyBox>
      {/*  {game && (
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
      </ul> */}
    </StyledLobby>
  );
};

export default Lobby;
