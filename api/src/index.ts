import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const { PORT } = process.env;
import router from './routes';

import './db'; // Run MongoDB in background

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
