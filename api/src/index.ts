import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const { PORT, CLIENT_URL } = process.env;
import router from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import './db'; // Run MongoDB in background

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(router);

const server = app.listen(PORT, () =>
  console.log(`Server is running on PORT:${PORT}`)
);

import webSocket from './websocket';
webSocket(server);
