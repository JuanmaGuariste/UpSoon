import { Router } from 'express';
import { authToken } from '../middleware/jwt.middleware.js';
import SessionsController from '../controllers/sessions.controller.js';

const sessionsController = new SessionsController();
const sessionsRouter = Router();

sessionsRouter.get('/current', authToken, sessionsController.userSession);

export default sessionsRouter;