import { thunk, action } from 'easy-peasy';
import io from 'socket.io-client';

const socketStore = {
  socket: null,

  setSocket: action((state, payload) => {
    state.socket = payload;
  }),

  connect: thunk(async (actions) => {
    const socket = io(process.env.API_URL);

    await new Promise((resolve) => {
      socket.on('connect', () => {
        actions.setSocket(socket);
        resolve();
      });
    });
  }),
};

export default socketStore;
