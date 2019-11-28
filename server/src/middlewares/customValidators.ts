import { Handler } from 'express';
import * as expressValidator from 'express-validator';
import axios from 'axios';
import UserModel from '../models/UserModel';
import config from '../config';

const isNotEmpty = (value: any[]): boolean => {
  if (!value) { return false; }

  return Boolean(value.length);
};

const isContains = (item: any, targetArray: any[]): boolean => {
  if (!item || !targetArray) { return false; }

  return targetArray.includes(item);
};

const isCustomEmail = (email: string): boolean => /^[-a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\-\.]+@[a-z0-9.\-]+$/.test(email);
const isPassword = (password: string): boolean => (
  /(?=.*[0-9])(?=.*[а-яёa-z])(?=.*[A-ZА-ЯЁ])[0-9a-zA-Z.,';\]\[{}:"<>?!@#$%^&*()_\-+=|\/№А-Яа-яЁё]{6,}/.test(password)
);

const isUserNotExistsByEmail = async (email: string): Promise<void> => {
  if (!email) { return Promise.resolve(); }

  const user = await UserModel.findOne({ email });

  if (user) { return Promise.reject('User not exists'); }

  return Promise.resolve();
};

const isCaptchaVerified = async (captchaResponse: string, userIP: string): Promise<void> => {
  if (!captchaResponse) { return Promise.reject('Captcha is required'); }

  const captchaUrl = config.get('captcha.url');
  const captchaSecret = config.get('captcha.secret');

  const verificationResponse = await axios.post(captchaUrl, {}, {
    params: {
      secret: captchaSecret,
      response: captchaResponse,
      remoteip: userIP,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
  });

  const { success } = verificationResponse.data;

  return success ? Promise.resolve() : Promise.reject('Captcha is not verified');
};

export default (): Handler => (
  expressValidator({
    customValidators: {
      isNotEmpty,
      isContains,
      isCustomEmail,
      isPassword,
      isUserNotExistsByEmail,
      isCaptchaVerified,
    },
  })
);
