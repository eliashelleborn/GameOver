import DataStore from '../models/DataStore';
import lobbyEvents from './lobby';
import testingEvents from './testing';
import controllerEvents from './controller';
import gamestateEvents from './gamestate';

export default (io) => {
  const dataStore = new DataStore(io);
  io.on('connection', (socket) => {
    lobbyEvents(io, socket, dataStore);
    controllerEvents(io, socket, dataStore);
    gamestateEvents(io, socket, dataStore);

    if (process.env.NODE_ENV === 'development') {
      testingEvents(io, socket, dataStore);
    }
  });
};
