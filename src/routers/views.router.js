import { Router } from 'express';
import { middlewarePassportJWT } from '../middleware/jwt.middleware.js';
import { isAdmin } from '../middleware/auth.middleware.js';
import { isAdminOrPremium } from '../middleware/auth.middleware.js';
import ViewsController from '../controllers/views.controller.js';

const viewsController = new ViewsController();
const viewsRouter = Router();

viewsRouter.get('/products', middlewarePassportJWT,  viewsController.getProducts);

viewsRouter.get('/myProducts', middlewarePassportJWT, viewsController.myProducts);

viewsRouter.get("/carts/:cid", middlewarePassportJWT,viewsController.getCartById);

viewsRouter.get('/realtimeproducts', middlewarePassportJWT, isAdminOrPremium, viewsController.realTimeProducts);

viewsRouter.get('/chat', middlewarePassportJWT, viewsController.chats);

viewsRouter.get('/register', viewsController.register);

viewsRouter.get('/registerError', viewsController.registerError);

viewsRouter.get('/loginError', viewsController.loginError);

viewsRouter.get('/login', viewsController.login);

viewsRouter.get('/', middlewarePassportJWT, viewsController.home);

viewsRouter.get('/current', middlewarePassportJWT, viewsController.current);

viewsRouter.get("/restore-password/uid/:uid/token/:token", viewsController.restorePassword)

viewsRouter.get('/premium', middlewarePassportJWT, viewsController.userToPremium);

viewsRouter.get('/allUsers', middlewarePassportJWT, isAdmin, viewsController.allUsers);

viewsRouter.get('/prevPurchase', middlewarePassportJWT, viewsController.prevPurchase);

export default viewsRouter;