import { ValidationError } from 'express-validator';

export class AppError extends Error {
  public statusCode: number;
  public errors?: ValidationError[] | string | string[];

  constructor(
    message: string,
    statusCode: number,
    errors?: ValidationError[] | string | string[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // Ensure correct prototype chain
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
