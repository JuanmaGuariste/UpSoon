import { Router } from 'express';
import MailsController from '../controllers/mails.controller.js';

const mailsController = new MailsController();
const mailsRouter = Router();

mailsRouter.get("/ticket/:tid", mailsController.createMail);

mailsRouter.get("/deleteproduct/:pid", mailsController.deleteProductMail);

mailsRouter.get("/inactiveUsers/:uid", mailsController.inactiveUsers);

mailsRouter.post("/:userEmail", mailsController.restorePasswordMail);

mailsRouter.post("/restore-password/uid/:userId", mailsController.restorePassword);

export { mailsRouter };