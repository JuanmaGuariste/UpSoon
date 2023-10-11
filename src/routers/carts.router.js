import { Router } from 'express';
import TicketsController from '../controllers/tickets.controller.js';
import { middlewarePassportJWT } from '../middleware/jwt.middleware.js';
import CartsController from '../controllers/carts.controller.js';

const cartsController = new CartsController();
const ticketsController = new TicketsController();
const cartsRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID del producto.
 *               cant:
 *                 type: integer
 *                 description: Cantidad de productos en el carrito.
 *       example:
 *         products:
 *           - product: 647cb133b56cd544f2fc2700
 *             cant: 2
 *           - product: 647cb2be2745f3031aa75ed3
 *             cant: 1
 * 
 *     CartQuantityToUpdate:
 *       type: object
 *       properties:
 *         cant:
 *           type: integer
 *           description: Cantidad de productos en el carrito.
 *       example:
 *         cant: 3
 * 
 *     CartProduct:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         price:
 *           type: number
 *         thumbnail:
 *           type: string
 *         code:
 *           type: string
 *         stock:
 *           type: integer
 *         status:
 *           type: boolean
 *         __v:
 *           type: integer
 *     
 *     CartItem:
 *       type: object
 *       properties:
 *         product:
 *           $ref: '#/components/schemas/CartProduct'
 *         cant:
 *           type: integer
 *         _id:
 *           type: string
 * 
 *     CartResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         payload:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             products:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *             __v:
 *               type: integer
 *       example:
 *         status: "success"
 *         payload:
 *           _id: "64b862ed175c5f4cf86550bd"
 *           products:
 *             - product:
 *                 _id: "64831a8600471906896f2cc3"
 *                 title: "mate"
 *                 description: "imperial"
 *                 category: "bazar"
 *                 price: 3000
 *                 thumbnail: "Sin imagen"
 *                 code: "1234asdqqq"
 *                 stock: 9
 *                 status: true
 *                 __v: 0
 *               cant: 1
 *               _id: "64ed541f57ea06703ca8c3e3"
 *             - product:
 *                 _id: "647cb2be2745f3031aa75ed3"
 *                 title: "mouse"
 *                 description: "azul"
 *                 category: "electronica"
 *                 price: 1500
 *                 thumbnail: "Sin imagen"
 *                 code: "ssaa123"
 *                 stock: 247
 *                 status: true
 *                 __v: 0
 *               cant: 1
 *               _id: "64ed5c3a444eab2c48bfdc09"
 */

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: The carts managing API *
 * paths:
 *   /api/carts/{cid}:
 *     get:
 *       summary: Gets a cart by id
 *       tags: [Carts]
 *       parameters:
 *         - in: path
 *           name: cid
 *           schema:
 *             type: string
 *           required: true
 *       responses:
 *         200:
 *           description: The cart was successfully retrieved
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CartResponse'
 *         500:
 *           description: Some server error
 */
cartsRouter.get("/:cid", cartsController.getCartById);

/** 
 * @swagger
 * tags:
 *  name: Carts
 *  description: The carts managing API
 * 
 * /api/carts:
 *   post:
 *     summary: Creates a new cart
 *     tags: [Carts]
 *     responses:
 *       201:
 *         description: The cart was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object        
 *               example:
 *                 status: "success"
 *                 payload:
 *                   _id: 64b862ed175c5f4cf86550bd
 *                   products: []
 *                   __v: 0  
 *       500:
 *         description: Some server error *  
 */
cartsRouter.post("/", cartsController.addCart)

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: The carts managing API
 *
 * paths:
 *   /api/carts/{cid}/product/{pid}:
 *     post:
 *       summary: Adds a product to a cart
 *       tags: [Carts]
 *       parameters:
 *         - in: path
 *           name: cid
 *           schema:
 *             type: string
 *           required: true
 *         - in: path
 *           name: pid
 *           schema:
 *             type: string
 *           required: true
 *       responses:
 *         201:
 *           description: The product was successfully added to the cart
 *           content:
 *             application/json:
 *               schema:
 *                 type: object        
 *                 example:
 *                   status: "success"
 *                   payload:
 *                     acknowledged: true
 *                     modifiedCount: 1
 *                     upsertedId: null
 *                     upsertedCount: 0
 *                     matchedCount: 1    
 *         500:
 *           description: Some server error
 */
cartsRouter.post("/:cid/product/:pid", middlewarePassportJWT, cartsController.addProductToCart);

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: The carts managing API
 *
 * paths:
 *   /api/carts/{cid}/product/{pid}:
 *     delete:
 *       summary: Removes a product from a cart
 *       tags: [Carts]
 *       parameters:
 *         - in: path
 *           name: cid
 *           schema:
 *             type: string
 *           required: true
 *         - in: path
 *           name: pid
 *           schema:
 *             type: string
 *           required: true
 *       responses:
 *         201:
 *           description: The product was successfully removed from the cart
 *           content:
 *             application/json:
 *               schema:
 *                 type: object        
 *                 example:
 *                   status: "success"
 *                   payload:
 *                     ProdId: 647cb2be2745f3031aa75ed3 
 *         500:
 *           description: Some server error
 */
cartsRouter.delete("/:cid/product/:pid", cartsController.deleteProductFromCart);

/** 
 * @swagger
 * tags:
 *  name: Carts
 *  description: The carts managing API
 * 
 * paths:
 *   /api/carts/{cid}:
 *     delete:
 *       summary: Deletes a cart
 *       tags: [Carts]
 *       parameters:
 *         - in: path
 *           name: cid
 *           schema:
 *             type: string
 *           required: true
 *       responses:
 *         201:
 *           description: The cart was successfully deleted
 *           content:
 *             application/json:
 *               schema:
 *                 type: object        
 *                 example:
 *                   status: "success"
 *                   payload:
 *                     CartId: 64c86f09e2e1e1190279b3a8                  
 *         500:
 *           description: Some server error
 */
cartsRouter.delete("/:cid", cartsController.deleteCartContent);

/** 
 * @swagger
 * tags:
 *  name: Carts
 *  description: The carts managing API
 * 
 * paths:
 *   /api/carts/{cid}:
 *     put:
 *       summary: Updates a cart
 *       tags: [Carts]
 *       parameters:
 *         - in: path
 *           name: cid
 *           schema:
 *             type: string
 *           required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       responses:
 *         201:
 *           description: The cart was successfully updated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object        
 *                 example:
 *                   status: "success"
 *                   payload:
 *                     CartId: 64c86f09e2e1e1190279b3a8  
 *         500:
 *           description: Some server error
 */
cartsRouter.put("/:cid", cartsController.updateCart);

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: The carts managing API
 * 
 * paths:
 *   /api/carts/{cid}/product/{pid}:
 *     put:
 *       summary: Updates a product in a cart
 *       tags: [Carts]
 *       parameters:
 *         - in: path
 *           name: cid
 *           schema:
 *             type: string
 *           required: true
 *         - in: path
 *           name: pid
 *           schema:
 *             type: string
 *           required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartQuantityToUpdate'
 *       responses:
 *         201:
 *           description: The product was successfully updated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object        
 *                 example:
 *                   status: "success"
 *                   payload:
 *                     CartId: 64c86f09e2e1e1190279b3a8  
 *         500:
 *           description: Some server error
 */
cartsRouter.put("/:cid/product/:pid", cartsController.updateProductInCart);

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: The carts managing API
 * 
 * paths:
 *   /api/carts/{cid}/purchase:
 *     post:
 *       summary: Purchase a cart
 *       tags: [Carts]
 *       parameters:
 *         - in: path
 *           name: cid
 *           schema:
 *             type: string
 *           required: true
 *       responses:
 *         201:
 *           description: The cart was successfully purchased
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                   payload:
 *                     type: object
 *                     properties:
 *                       Ticket:
 *                         type: object
 *                         properties:
 *                           code:
 *                             type: string
 *                           amount:
 *                             type: number
 *                           purchaser:
 *                             type: string
 *                           _id:
 *                             type: string
 *                           purchase_datetime:
 *                             type: string
 *                           __v:
 *                             type: integer
 *                     example:
 *                       Ticket:
 *                         code: "TICKET-1694287787666"
 *                         amount: 9000
 *                         purchaser: "user@email.com"
 *                         _id: "64fcc7abd5e6576a6b82197d"
 *                         purchase_datetime: "2023-09-09T19:29:47.678Z"
 *                         __v: 0
 *         500:
 *           description: Some server error
 */
cartsRouter.post("/:cid/purchase", middlewarePassportJWT,  ticketsController.addTicket);

export { cartsRouter };

