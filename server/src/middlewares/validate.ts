import { Request, Response, NextFunction, Handler } from 'express';
import { ValidationSchema } from 'express-validator';

export default (
  schemaFactory: (req: Request) => ValidationSchema,
): Handler => async (req: Request, res: Response, next: NextFunction) => {
  const schema = schemaFactory(req);
  const paramsBackup = { ...req.params };

  req.params = { ...req.body, ...req.query, ...req.params };
  req.checkParams(schema);

  try {
    await req.asyncValidationErrors(true);

    req.params = paramsBackup;

    return next();
  } catch (err) {
    delete err.isOperational;

    return res.status(422).json({ errors: err });
  }
};
