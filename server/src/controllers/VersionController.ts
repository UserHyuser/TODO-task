import { Router, Request, Response, NextFunction } from 'express';
import config from '../config';
import BaseController from './BaseController';

class VersionController extends BaseController {
  public init(): void {
    this.router.get('/', this.get);
  }

  private get(req: Request, res: Response, next: NextFunction): Response {
    return res.json({ version: config.get('version') });
  }
}

export default VersionController;
