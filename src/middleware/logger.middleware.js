import winston from 'winston';
import environment from '../config/environment.js';
import customLevelsOptions from '../utils/customLevelsOptions.js';

let logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './error.log',
            level: 'error',
            format: winston.format.simple()
        }),
    ],
}
);

if (environment.ENVIRONMENT === 'development') {
    logger = winston.createLogger({
        levels: customLevelsOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }),
        ],
    });
}  

const loggerMiddleware = (req, res, next) => {
    req.logger = logger;
    next();
}

export {loggerMiddleware, logger}