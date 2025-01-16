import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from './appError';

export const exAsyncWrapper =
  (fn: Function, schema?: any[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema) {
        await Promise.all(schema.map((validation) => validation.run(req)));
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new AppError('Validation failed', 400, errors.array());
      }

      await fn(req, res, next);
    } catch (error: any) {
      next(new AppError(error.message, error.statusCode || 400));
    }
  };
