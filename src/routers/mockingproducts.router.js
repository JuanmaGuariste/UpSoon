import MockingproductsController from '../controllers/mockingproducts.controller.js';
import { Router } from 'express';

const mockingproductsController = new MockingproductsController();
const mockingProductsRouter = Router();

mockingProductsRouter.get('/', mockingproductsController.generateProducts);

export { mockingProductsRouter };