import { Request, Response, NextFunction } from 'express';
import { AppError } from './appError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError ? err.message : 'Internal Server Error';
  const errors = err instanceof AppError ? err.errors : undefined;

  console.log(err);

  // Log unexpected errors for debugging purposes
  if (!(err instanceof AppError)) {
    console.error('Unexpected Error:', err);
  }

  // Send the response, including validation errors if they exist
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }), // Include errors only if they exist
  });
};
