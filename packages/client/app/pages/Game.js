import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useStore, useActions } from 'easy-peasy';
import PropTypes from 'prop-types';
import GameCanvas from '../../game/GameCanvas';

const Game = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { socket } = useStore(state => state.socket);
  const { game } = useStore(state => state.game);
  const { setGame, updatePlayers } = useActions(actions => actions.game);

  useEffect(() => {
    if (!game) {
      socket.emit('join game', match.params);
      socket.on('join game', (g) => {
        setGame(g);
        setIsLoading(false);
      });
      socket.on('join game failed', () => {
        setIsLoading(false);
      });
    }

    socket.on('players updated', (players) => {
      updatePlayers(players);
    });

    socket.on('game deleted', () => {
      setGame(null);
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
      {game && (
        <h1>
          {'Game ID: '}
          {game.id}
        </h1>
      )}
      <ul>
        {game.players.map(player => (
          <li key={player.id}>{`${player.id} - ${player.name}`}</li>
        ))}
      </ul>

      <div>{false && <GameCanvas />}</div>
    </div>
  );
};

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
};

Game.defaultProps = {
  match: null,
};

export default Game;
