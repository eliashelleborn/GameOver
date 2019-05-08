import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useStore, useActions } from 'easy-peasy';

const StyledStart = styled.div``;

const Start = () => {
  const [redirectPath, setRedirectPath] = useState(null);
  const socket = useStore(state => state.socket.socket);
  const setGame = useActions(actions => actions.game.setGame);

  useEffect(() => {
    socket.on('join game', (game) => {
      setGame(game);
      setRedirectPath(game.id);
    });
  }, []);

  const hostGame = () => {
    socket.emit('host game');
  };

  if (redirectPath) return <Redirect to={`/game/${redirectPath}`} />;

  return (
    <StyledStart>
      <h1>Start</h1>
      <button type="button" onClick={hostGame}>
        Host
      </button>
    </StyledStart>
  );
};

export default Start;
