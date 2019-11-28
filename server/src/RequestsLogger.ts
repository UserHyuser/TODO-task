import { Handler, ErrorRequestHandler } from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

class RequestsLogger {
  public all(): Handler {
    return expressWinston.logger({
      transports: [
        new winston.transports.DailyRotateFile({
          filename: `${__dirname}/../logs/all/%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          maxsize: '10m',
        }),
      ],
    });
  }

  public errors(): ErrorRequestHandler {
    return expressWinston.errorLogger({
      transports: [
        new winston.transports.DailyRotateFile({
          filename: `${__dirname}/../logs/errors/%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          maxsize: '10m',
        }),
      ],
    });
  }
}

export default RequestsLogger;
