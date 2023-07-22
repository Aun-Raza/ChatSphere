import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { MONGO_URL } = process.env;

console.log('RUNNING MONGO');
mongoose
  .connect(MONGO_URL || '')
  .then(() => console.log('Connected to MongoDB..'))
  .catch((error) => console.log(typeof error, error));
