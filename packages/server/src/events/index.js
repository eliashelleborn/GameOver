import DataStore from '../models/DataStore';
import lobbyEvents from './lobby';
import testingEvents from './testing';
import gameplayEvents from './gameplay';

const dataStore = new DataStore();

export default (io) => {
  io.on('connection', (socket) => {
    lobbyEvents(io, socket, dataStore);
    gameplayEvents(io, socket, dataStore);

    if (process.env.NODE_ENV === 'development') {
      testingEvents(io, socket, dataStore);
    }
  });
};
