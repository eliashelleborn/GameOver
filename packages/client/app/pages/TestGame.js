import React, { useEffect, useState } from 'react';
import { useStore, useActions } from 'easy-peasy';
import { Redirect } from 'react-router-dom';
import GameCanvas from '../../game/GameCanvas';
import Lobby from './Game/Lobby';
import GameScreen from './Game/GameScreen';
import Controller from './Game/Controller';

const TestGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { socket } = useStore(state => state.socket);
  const { game } = useStore(state => state.game);
  const { setGame, updatePlayers } = useActions(actions => actions.game);

  useEffect(() => {
    socket.emit('join/host test-game');

    socket.on('join game', (g) => {
      setGame(g);
      setIsLoading(false);
    });

    socket.on('join game failed', () => {
      setIsLoading(false);
    });

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

  return <div>{game.host === socket.id ? <GameCanvas testing /> : <Controller />}</div>;
};

export default TestGame;
