import React from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import Div100vh from 'react-div-100vh/lib/Div100vh';
import RoomCode from '../../components/Lobby/RoomCode';
import LobbyBox from '../../components/Lobby/LobbyBox';
import Players from '../../components/Lobby/Players';
import GameInfo from '../../components/Lobby/GameInfo';

const StyledLobby = styled(Div100vh)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: scroll;
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
