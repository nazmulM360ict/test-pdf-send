import { Request, Response, NextFunction } from 'express';
import { AppError } from './appError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  // If the error is an instance of AppError, extract details
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    console.error('Unexpected Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
