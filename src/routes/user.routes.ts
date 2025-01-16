import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRoutes {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.userController.create);
  }
}
