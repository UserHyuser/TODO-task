import { Request } from 'express';
import * as mongoose from 'mongoose';
import { Passport } from 'passport';
import * as passportLocal from 'passport-local';
import * as passportJWT from 'passport-jwt';
import * as bcrypt from 'bcryptjs-then';
import config from '../config';
import UserModel, { User } from '../models/UserModel';
import {
  SerializeUserDone,
  DeserializeUserDone,
  PassportStrategyDone,
} from '../types/passport';

class JWTAuth extends Passport {
  constructor() {
    super();
    this.initPassport();
  }

  private initPassport(): void {
    this.serializeUser((user: User, done: SerializeUserDone): void => {
      return done(null, user._id);
    });

    this.deserializeUser(async (id: mongoose.Types.ObjectId, done: DeserializeUserDone): Promise<void> => {
      const user = await UserModel.findOne({ _id: id }, { password: false });
      if (!user || !user._id) {
        return done('not found');
      }
      return done(null, user);
    });

    this.use(new passportLocal.Strategy({
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done: PassportStrategyDone): Promise<void> => {
        const user = await UserModel.findOne({ email }).lean();

        if (!user) {
          return done('Incorrect e-mail or password', null);
        }

        const passwordCompareResult = await bcrypt.compare(password, user.password);

        if (!passwordCompareResult) {
          return done('Incorrect e-mail or password', null);
        }

        delete user.password;

        return done(null, user);
      },
    ));

    const jwtStrategyOpts: passportJWT.StrategyOptions = {
      jwtFromRequest: null,
      secretOrKey: null,
    };

    jwtStrategyOpts.jwtFromRequest = (req: Request): string => {
      if (req && req.cookies && req.cookies.jwt) {
        return req.cookies.jwt;
      }

      if (req && req.headers && req.headers.authorization) {
        return req.headers.authorization;
      }
    };

    jwtStrategyOpts.secretOrKey = config.get('jwt.secret');

    this.use(new passportJWT.Strategy(
      jwtStrategyOpts,
      async (jwtPayload: any, done: PassportStrategyDone) => {
        const user = await UserModel.findOne({ _id: jwtPayload.userId }).lean();

        if (!user) {
          return done('Unauthorized', null);
        }

        return done(null, user);
      },
    ));
  }
}

export default new JWTAuth();
