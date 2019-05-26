import React from 'react';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';
import Div100vh from 'react-div-100vh/lib/Div100vh';
import RoomCode from '../../components/Lobby/RoomCode';
import LobbyBox from '../../components/Lobby/LobbyBox';
import Players from '../../components/Lobby/Players';
import GameInfo from '../../components/Lobby/GameInfo';

const StyledLobby = styled(Div100vh)`
  padding-top: calc(env(safe-area-inset-top) + 2rem);
  padding-right: calc(env(safe-area-inset-right) + 2rem);
  padding-bottom: calc(env(safe-area-inset-bottom) + 2rem);
  padding-left: calc(env(safe-area-inset-left) + 2rem);
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
        <GameInfo startGame={startGame} isHost={game.host === socket.id} />
      </LobbyBox>
    </StyledLobby>
  );
};

export default Lobby;
