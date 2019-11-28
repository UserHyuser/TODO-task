import { Request, Response, NextFunction } from 'express';
import passport from '../../middlewares/Passport';
import BaseController from '../BaseController';

class UserController extends BaseController {
  public init(): void {
    this.router.get('/current', passport.authenticate('jwt', { session: false }), this.getCurrent);
  }

  public getCurrent(req: Request, res: Response, next: NextFunction): Response {
    const { user } = req;

    return res.json(user);
  }
}

export default UserController;
