import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useStore, useActions } from 'easy-peasy';
import Logo from '../components/Logo';

const StyledStart = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  padding-top: 5rem;
  overflow-y: scroll;

  button {
    width: 100%;
    max-width: 350px;
    height: 55px;
    background-color:  ${({ theme }) => theme.colorPrimary};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    transition: .2s ease;

    &:hover {
      background-color:  ${({ theme }) => theme.colorPrimaryHover};
    }
  }

  form {
    max-width: 350px;
    margin-top: 5rem;

    input {
      outline: 0;
      width: 100%
      max-width: 350px;
      height: 55px;
      padding: 1rem;
      border: none;
      border-radius: 5px;
      margin-bottom: 1rem;

      &::placeholder {
        color: #848484;
        font-weight: bold;
      }
    }
  }

  @media screen and (max-height: 500px) {
    padding: 1rem;
    justify-content: center;

    form {
      margin-top: 0;
    }

    svg {
      position: absolute;
      left: 1rem;
      top: 1rem;
      width: 100px;
    }
  }
`;

const OrDivider = styled.div`
  width: 100%;
  max-width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #364872;
  padding: 0.7rem 0;
  font-size: 18px;
  font-weight: bold;

  span {
    flex: 1;
    height: 2px;
    background-color: #364872;

    &:first-child {
      margin-right: 1rem;
    }
    &:last-child {
      margin-left: 1rem;
    }
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

    socket.on('join game failed', () => {
      console.log('join game failed');
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
      <Logo width="450px" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          joinGame();
        }}
      >
        <input
          type="text"
          placeholder="Room Code"
          value={roomCode.toUpperCase()}
          onChange={({ target }) => setRoomCode(target.value)}
          minLength={4}
          maxLength={4}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          minLength={3}
          maxLength={15}
          required
        />
        <button type="submit">JOIN</button>
      </form>

      <OrDivider>
        <span />
        OR
        <span />
      </OrDivider>

      <button type="button" onClick={hostGame}>
        HOST GAME
      </button>
    </StyledStart>
  );
};

export default Start;
