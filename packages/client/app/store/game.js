import { action } from 'easy-peasy';

const gameStore = {
  game: null,

  setGame: action((state, payload) => {
    state.game = payload;
  }),

  updatePlayers: action((state, payload) => {
    state.game.players = payload;
  }),
};

export default gameStore;
