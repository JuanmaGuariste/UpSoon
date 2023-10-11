import { Router } from 'express';
import LogsController from '../controllers/logs.controller.js';

const logsController = new LogsController();
const logsRouter = Router();

logsRouter.get('/', logsController.logger);

export { logsRouter };