import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes';

// Express Instance
const app = express();

// Plugins
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/* app.use(passport.initialize()) */

// API Routes
app.use('/api', routes);

export default app;
