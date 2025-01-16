import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './routes/user.routes';
import { errorHandler } from './middlewares/errorHanlder';

function errorHandler2(err: any, req: Request, res: Response, next: any) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500);
  res.render('error', { error: err });
}

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.get('/', (req, res) => {
      throw new Error('BROKEN'); // Express will catch this on its own.
    });

    this.app.use('/api/users', new UserRoutes().router);

    this.app.use(errorHandler);

    this.app.use((req, res, next) => {
      res.status(404).send('Route not found');
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default App;
