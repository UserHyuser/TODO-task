import * as jwt from 'jsonwebtoken';
import { User } from '../models/UserModel';
import config from '../config';

class AuthService {
  public static generateToken(user: User): string {
    const payload = { userId: user._id };
    const options = {
      expiresIn: config.get('jwt.expiresIn'),
    };

    return jwt.sign(payload, config.get('jwt.secret'), options);
  }
}

export default AuthService;
