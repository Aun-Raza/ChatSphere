import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;
import UserModel from '../models/User';
import _ from 'lodash';
import bcrypt from 'bcrypt';
const saltRounds = bcrypt.genSaltSync(12);
import jwt from 'jsonwebtoken';
import MessageModel from '../models/Message';
import { UserProps } from '../types/User';

export async function getMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!id) {
    res.status(401);
    const error = new Error('Given Id is not provided.');
    return next(error);
  }

  const { token } = req.cookies;
  if (!token) {
    res.status(401);
    const error = new Error('Token is invalid or not provided.');
    return next(error);
  }

  const foundUser = jwt.verify(token, JWT_SECRET || '') as UserProps;
  if (!foundUser) {
    res.status(401);
    const error = new Error('Token is invalid or not provided.');
    return next(error);
  }

  const messages = await MessageModel.find({
    senderId: { $in: [foundUser._id, id] },
    recipientId: { $in: [foundUser._id, id] },
  }).sort({ createdAt: 1 });

  res.json(messages);
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;
  if (!token) {
    res.status(401);
    const error = new Error('Token is invalid or not provided.');
    return next(error);
  }

  const foundUser = jwt.verify(token, JWT_SECRET || '');
  if (!foundUser) {
    res.status(401);
    const error = new Error('Token is invalid or not provided.');
    return next(error);
  }

  res.json(foundUser);
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    const error = new Error('Username or password is not provided.');
    return next(error);
  }

  const foundUser = await UserModel.findOne({ username });
  if (foundUser) {
    res.status(401);
    const error = new Error('User is already registered.');
    return next(error);
  }

  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  const newUser = await UserModel.create({
    username,
    password: hashedPassword,
  });

  const newUserSelectedProps = _.pick(newUser, ['_id', 'username']);
  const token = jwt.sign(newUserSelectedProps, JWT_SECRET || '');
  res
    .cookie('token', token, { sameSite: 'none', secure: true })
    .status(201)
    .json(newUserSelectedProps);
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    const error = new Error('Username or password is not provided.');
    return next(error);
  }

  const foundUser = await UserModel.findOne({ username });
  if (!foundUser) {
    res.status(401);
    const error = new Error('Username or password is invalid.');
    return next(error);
  }

  const isCorrectPassword = bcrypt.compareSync(password, foundUser.password);
  if (!isCorrectPassword) {
    res.status(401);
    const error = new Error('Username or password is invalid.');
    return next(error);
  }

  const newUserSelectedProps = _.pick(foundUser, ['_id', 'username']);
  const token = jwt.sign(newUserSelectedProps, JWT_SECRET || '');
  res
    .cookie('token', token, { sameSite: 'none', secure: true })
    .status(201)
    .json(newUserSelectedProps);
}

export function errorhandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.json({ error: err.message });
}

export function notFound(req: Request, res: Response) {
  res.status(404).json({ error: 'Not Found' });
}
