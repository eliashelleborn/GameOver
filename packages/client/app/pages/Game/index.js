import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useStore, useActions } from 'easy-peasy';
import PropTypes from 'prop-types';
import Lobby from './Lobby';
import GameScreen from './GameScreen';
import Controller from './Controller';

const Game = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { socket } = useStore(state => state.socket);
  const { game } = useStore(state => state.game);
  const { setGame, addPlayer, removePlayer } = useActions(actions => actions.game);

  useEffect(() => {
    if (!game) {
      socket.emit('join game', match.params);
    } else {
      setIsLoading(false);
    }

    // TURN EVENTS, MOVE TO GAMESCENE
    socket.on('prepare turn', (turn) => {});
    socket.on('start turn', () => {});
    socket.on('end turn', () => {});
    socket.on('countdown', (time, status) => {
      console.log(time, status);
    });

    socket.on('join game', (g) => {
      setGame(g);
      setIsLoading(false);
    });

    socket.on('join game failed', () => {
      setIsLoading(false);
    });

    socket.on('player joined', (player) => {
      addPlayer(player);
    });

    socket.on('player left', (player) => {
      removePlayer(player);
    });

    socket.on('game deleted', () => {
      setGame(null);
    });

    socket.on('start game', (g) => {
      setGame(g);
    });

    return () => {
      socket.emit('leave game');
      socket.removeAllListeners();
    };
  }, []);

  if (!game && isLoading) return <p>Trying to join game...</p>;
  if (!game && !isLoading) return <Redirect to="/" />;

  return (
    <div>
      {game.status === 'lobby' && <Lobby game={game} />}
      {game.status === 'playing' && (game.host === socket.id ? <GameScreen /> : <Controller />)}
    </div>
  );
};

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

Game.defaultProps = {
  match: null,
};

export default Game;
