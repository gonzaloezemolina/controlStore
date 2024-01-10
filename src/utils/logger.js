import winston from "winston";

const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

const colors = {
  debug: 'blue',
  http: 'green',
  info: 'cyan',
  warning: 'yellow',
  errors: 'red',
  fatal: 'magenta',
};

winston.addColors(colors);

const getLogger = winston.createLogger({
  levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({
      level: 'info',
    }),
    new winston.transports.File({
      level: 'warning',
      level: 'error',
      level: 'fatal',
      filename: 'errors.log', 
    }),
  ],
});




export default getLogger;
