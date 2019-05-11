import { createStore } from 'easy-peasy';
import socket from './socket';
import game from './game';

const store = createStore({
  socket,
  game,
});

export default store;
