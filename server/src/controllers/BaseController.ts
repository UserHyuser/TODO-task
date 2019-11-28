import { Router } from 'express';

abstract class BaseController {
  protected router: Router;

  constructor() {
    this.router = Router();
  }

  public abstract init(): void;

  public getRouter(): Router {
    return this.router;
  }
}

export default BaseController;
