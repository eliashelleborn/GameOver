import DataStore from '../models/DataStore';
import lobbyEvents from './lobby';

const dataStore = new DataStore();

export default (io) => {
  io.on('connection', (socket) => {
    lobbyEvents(io, socket, dataStore);
  });
};
