import { Request } from 'express';
import { ValidationSchema } from 'express-validator';

export const signUpSchema = (req: Request): ValidationSchema => ({
  email: {
    isCustomEmail: { errorMessage: 'Invalid email format' },
    isUserNotExistsByEmail: { errorMessage: 'User with this email is already exists' },
    isNotEmpty: { errorMessage: 'Email is required' },
  },
  password: {
    isPassword: { errorMessage: 'Invalid password format' },
    isLength: { options: [{ min: 6 }], errorMessage: 'Min length is 6 symbols' },
    isNotEmpty: { errorMessage: 'Password is required' },
  },
  captcha: {
    isCaptchaVerified: {
      errorMessage: 'Captcha is not verified',
      options: [req.connection.remoteAddress],
    },
  },
});

export const signInSchema = (req: Request): ValidationSchema => ({
  email: {
    isNotEmpty: { errorMessage: 'Email is required' },
  },
  password: {
    isNotEmpty: { errorMessage: 'Password is required' },
  },
});
