import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';
import _ from 'lodash';
import bcrypt from 'bcrypt';
const saltRounds = bcrypt.genSaltSync(12);

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
  res.json(_.pick(newUser, ['_id', 'username']));
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

  res.json(_.pick(foundUser, ['_id', 'username']));
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
