import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { openAPIRouter } from '@api-docs/openAPIRouter';
import { ENDPOINTS } from '@common/consts';
import errorHandler from '@common/middleware/errorHandler';
import rateLimiter from '@common/middleware/rateLimiter';
import requestLogger from '@common/middleware/requestLogger';
import { getCorsOrigin } from '@common/utils/envConfig';
import { gameElementRouter } from '@modules/gameElement/gameElement.router';
import { gameSetupRouter } from '@modules/gameSetup/gameSetup.router';
import { healthCheckRouter } from '@modules/healthCheck/healthCheckRouter';

const logger = pino({ name: 'server start' });
const app: Express = express();
const corsOrigin = getCorsOrigin();

// Middlewares
app.use(cors({ origin: [corsOrigin], credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger({ level: 'silent' }));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(ENDPOINTS.HEALTH_CHECK.BASE, healthCheckRouter);
app.use(ENDPOINTS.GAME_SETUP.BASE, gameSetupRouter);
app.use(ENDPOINTS.GAME_ELEMENT.BASE, gameElementRouter);
// Swagger UI
app.use('/api-docs', openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
