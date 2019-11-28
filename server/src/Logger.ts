import * as winston from 'winston';
import 'winston-daily-rotate-file';

// Logger methods:
//
// logger.info(String);
// logger.error(String);
// logger.warn(String);
// logger.debug(String);
// logger.verbose(String);
// logger.silly(String);

class Logger extends winston.Logger {
  constructor() {
    super();
    this.initLogger();
  }

  private initLogger(): void {
    this.add(winston.transports.Console, {});
    this.add(winston.transports.DailyRotateFile, {
      filename: `${__dirname}/../logs/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxsize: '10m',
    });
  }
}

export default Logger;
