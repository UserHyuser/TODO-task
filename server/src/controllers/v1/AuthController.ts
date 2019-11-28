import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs-then';
import * as VError from 'verror';
import passport from '../../middlewares/Passport';
import UserModel, { User } from '../../models/UserModel';
import { AuthService } from '../../services';
import validate from '../../middlewares/validate';
import { signUpSchema, signInSchema } from '../../validationSchemas/auth';
import BaseController from '../BaseController';

class AuthController extends BaseController {
  public init(): void {
    this.router.post(
      '/signin',
      validate(signInSchema),
      passport.authenticate('local', { failWithError: true }),
      this.signIn,
      this.signInError,
    );
    this.router.post('/signup', validate(signUpSchema), this.signUp);
  }

  public signIn(req: Request, res: Response, next: NextFunction): Response | void {
    try {
      const user = req.user as User;
      const token = AuthService.generateToken(user);

      res.cookie('jwt', token, { httpOnly: true });

      return res.json({ token, message: 'Success', id: req.user._id });
    } catch (err) {
      return next(err instanceof Error ? err : new VError(err));
    }
  }

  public signInError(err: Error, req: Request, res: Response, next: NextFunction): Response {
    return res.status(401).send(err);
  }

  public async signUp(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user = req.body;
      const userDoc = {
        email: user.email,
        password: await bcrypt.hash(user.password),
      };

      await UserModel.create(userDoc);

      return res.status(201).send('Registration completed');
    } catch (err) {
      return next(err instanceof Error ? err : new VError(err));
    }
  }
}

export default AuthController;
