import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useStore, useActions } from 'easy-peasy';

const StyledStart = styled.div`
  padding: 2rem;
  input {
    display: block;
    margin-bottom: 0.5rem;
  }
`;

const Start = () => {
  const [redirectPath, setRedirectPath] = useState(null);
  const socket = useStore(state => state.socket.socket);
  const setGame = useActions(actions => actions.game.setGame);

  // Form
  const [roomCode, setRoomCode] = useState('AAAA');
  const [name, setName] = useState('Tester');

  useEffect(() => {
    socket.on('join game', (game) => {
      setGame(game);
      setRedirectPath(game.id);
    });
  }, []);

  const hostGame = () => {
    socket.emit('host game');
  };

  const joinGame = () => {
    socket.emit('join game', { id: roomCode, name });
  };

  if (redirectPath) return <Redirect to={`/game/${redirectPath}`} />;

  return (
    <StyledStart>
      <h1>Start</h1>

      <button type="button" onClick={hostGame}>
        Host Game
      </button>
      <hr />
      <div>
        <label htmlFor="roomCode">
          Room Code
          <input
            type="text"
            name="roomCode"
            id="roomCode"
            placeholder="4-letter code"
            value={roomCode}
            onChange={({ target }) => setRoomCode(target.value)}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <button type="button" onClick={joinGame}>
          Join
        </button>
      </div>
    </StyledStart>
  );
};

export default Start;
