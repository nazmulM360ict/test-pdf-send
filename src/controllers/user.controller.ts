import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { UserService } from '../services/user.service';
import { userSchema } from '../validations/user.validation';

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

  create = asyncWrapper(async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body);

    res.status(201).json(user);
  }, userSchema);

  update = asyncWrapper(async (req: Request, res: Response) => {
    const user = await this.userService.update(req.params.id, req.body);
    res.json(user);
  });

  delete = asyncWrapper(async (req: Request, res: Response) => {
    const success = await this.userService.delete(req.params.id);
    res.json({ success });
  });
}
