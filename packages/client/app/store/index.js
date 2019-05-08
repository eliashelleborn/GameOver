import { createStore } from 'easy-peasy';
import socket from './socket';

const store = createStore({
  socket,
});

export default store;
