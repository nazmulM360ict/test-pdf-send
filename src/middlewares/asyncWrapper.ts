import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { AppError } from './appError';

export const asyncWrapper =
  (fn: Function, schema?: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema) {
        await schema.validateAsync(req.body, { abortEarly: false });
      }
      await fn(req, res, next);
    } catch (error: any) {
      next(new AppError(error.message, 400));
    }
  };
