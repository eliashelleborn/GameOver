import 'dotenv/config';
import http from 'http';
import SocketIO from 'socket.io';
import app from './config/express';
import events from './events';

const server = http.Server(app);

const io = SocketIO(server);
events(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`✅  | Server listening on http://localhost:${PORT}`);
});

export default server;
