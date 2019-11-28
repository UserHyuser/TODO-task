import * as express from 'express';
import * as bodyParser from 'body-parser';
import RequestsLogger from './RequestsLogger';
import passport from './middlewares/Passport';
import customValidators from './middlewares/customValidators';
import MainController from './controllers/MainController';

const requestsLogger = new RequestsLogger();

class Express {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initPreRoutesMiddlewares();
    this.initRoutes();
    this.initPostRoutesMiddlewares();
  }

  private initPreRoutesMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(requestsLogger.all());
    this.app.use(customValidators());
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private initRoutes(): void {
    const mainController = new MainController();
    mainController.init();
    this.app.use('/api', mainController.getRouter());
  }

  private initPostRoutesMiddlewares() {
    this.app.use(requestsLogger.errors());
  }
}

export default Express;
