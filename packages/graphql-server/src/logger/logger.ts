import winston from 'winston'

export const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
}

export const logger = winston.createLogger({
  format: winston.format.combine(winston.format.json()),
  defaultMeta: { service: 'apollo-server' },
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.json()),
    }),
  ],
})

export default logger
