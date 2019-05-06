import 'dotenv/config';
import http from 'http';
import app from './config/express';

const server = http.Server(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
