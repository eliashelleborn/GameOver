import { action } from 'easy-peasy';

const gameStore = {
  game: null,
  testing: false,

  enableTesting: action((state) => {
    state.testing = true;
  }),

  setGame: action((state, payload) => {
    state.game = payload;
  }),

  updatePlayers: action((state, payload) => {
    state.game.players = payload;
  }),
};

export default gameStore;
