import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { MessageResponse, TokenContent } from './types/uploadTypes';
import CustomError from './classes/CustomError';
import 'dotenv/config';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`- Not Found - ${req.originalUrl}`, 404);
  next(error); // forward error to error handler
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  console.error('errorHandler', err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
};


const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('authenticate');
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({'message': 'Authentication failed1'});
      return;
    }

    const token = authHeader.split(' ')[1];
    console.log(process.env.JWT_SECRET);
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenContent;

    console.log(decodedToken);
    if (!decodedToken) {
      res.status(401).json({'message': 'Authentication failed2'});
      return;
    }

    res.locals.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(401).json({'message': 'Authentication failed3'});

  }
};

export { authenticate, errorHandler, notFoundHandler };