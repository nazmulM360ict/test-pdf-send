import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { exAsyncWrapper } from '../middlewares/expressValidatorAssync';
import { UserService } from '../services/user.service';
import { userValidationSchema } from '../validations/express.validator';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAll = asyncWrapper(async (req: Request, res: Response) => {
    const users = await this.userService.findAll();
    res.json(users);
  });

  getOne = asyncWrapper(async (req: Request, res: Response) => {
    const user = await this.userService.findOne(req.params.id);
    res.json(user);
  });

  create = exAsyncWrapper(async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body);

    res.status(201).json(user);
  }, userValidationSchema);

  update = asyncWrapper(async (req: Request, res: Response) => {
    const user = await this.userService.update(req.params.id, req.body);
    res.json(user);
  });

  delete = asyncWrapper(async (req: Request, res: Response) => {
    const success = await this.userService.delete(req.params.id);
    res.json({ success });
  });
}
