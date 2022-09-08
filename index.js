import 'dotenv/config.js';
import express from 'express';

import './db/client.js';
import cors from 'cors';

import path from 'path';

import logger from 'morgan';
import helmet from 'helmet';
import errorHandler from './middlewares/errorHandler.js';

import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';

const app = express();

// parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(logger('dev'));

const corsOptions = {
  origin: '*',
  exposedHeaders: 'x-authorization-token', // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const __dirname = path.resolve();

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.get('/favicon.ico', (req, res) => res.status(204).send('no content'));

// app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

export default app;
