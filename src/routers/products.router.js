import { Router } from 'express';
import ProductsController from '../controllers/products.controller.js';
import { middlewarePassportJWT } from '../middleware/jwt.middleware.js';

const productsController = new ProductsController();
const productsRouter = Router();

/**
 * @swagger
 * components:
*  schemas:
*    Product:
*        type: object
*        required:
*            - title
*            - description
*            - category
*            - price
*            - thumbnail
*            - code
*            - status
*            - stock
*        properties:
*            _id:
*                type: string
*                description: The auto-generated id of the product from the database
*            title:
*                type: string
*                description: The title of the product
*            description:
*                type: string
*                description: The description of the product
*            category:
*                type: string
*                description: The category of the product
*            price:
*                type: number
*                description: The price of the product
*            thumbnail:
*                type: string
*                description: The images of the product
*            code:
*                type: string
*                description: The code of the product. It has to be unique.
*            stock:
*                type: number
*                description: The stock of the product
*            status:
*                type: boolean
*                description: The status of the product
*            owner:
*                type: string
*                description: The owner of the product
*        example:
*            _id: 60f01dashtsd2224dqwidsdf2
*            title: "Celular Motorola"
*            description: "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM."
*            category: "Celulares"
*            price: 400000
*            thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true"
*            code: 12adadaaddqeryh3
*            stock: 10
*            status: true
*            owner: 160f01dajkwrty224hnd2224dqwidsdf2*
*
*    ProductToUpdate:
*        type: object
*        properties:
*            title:
*                type: string
*                description: The title of the product
*            description:
*                type: string
*                description: The description of the product
*            category:
*                type: string
*                description: The category of the product
*            price:
*                type: number
*                description: The price of the product
*            thumbnail:
*                type: string
*                description: The images of the product
*            code:
*                type: string
*                description: The code of the product. It has to be unique.
*            stock:
*                type: number
*                description: The stock of the product
*            status:
*                type: boolean
*                description: The status of the product
*        example:
*            title: "Celular Motorola"
*            description: "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM."
*            category: "Celulares"
*            price: 400000
*            thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true"
*            code: 12adadaaddqeryh3
*            stock: 10
*            status: true
*
*    ProductToAdd:
*        type: object
*        required:
*            - title
*            - description
*            - category
*            - price
*            - thumbnail
*            - code
*            - status
*            - stock
*        properties:           
*            title:
*                type: string
*                description: The title of the product
*            description:
*                type: string
*                description: The description of the product
*            category:
*                type: string
*                description: The category of the product
*            price:
*                type: number
*                description: The price of the product
*            thumbnail:
*                type: string
*                description: The images of the product
*            code:
*                type: string
*                description: The code of the product. It has to be unique.
*            stock:
*                type: number
*                description: The stock of the product
*            status:
*                type: boolean
*                description: The status of the product
*        example:
*            title: "Celular Motorola"
*            description: "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM."
*            category: "Celulares"
*            price: "400000"
*            thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true"
*            code: "12dsgfds2ew3"
*            stock: "10"
*            status: "true"
*
*    ProductToAddResponse:
*        type: object        
*        example:
*            "status": "success"
*            "payload":
*                title: "Celular Motorola"
*                description: "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM."
*                category: "Celulares"
*                price: 400000
*                thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true"
*                code: "12dsgfds2ew3"
*                stock: 10
*                status: true
*                owner: ["64c6fc8b11889810c5bc811b"]
*                _id: "64fc88062038f3ea5888b2f2"
*                __v: 0
*
*    ProductList:
*      type: object
*      properties:
*        _id:
*          type: string
*        title:
*          type: string
*        description:
*          type: string
*        category:
*          type: string
*        price:
*          type: number
*        thumbnail:
*          type: string
*        code:
*          type: string
*        stock:
*          type: integer
*        status:
*          type: boolean
*        __v:
*          type: integer
*        id:
*          type: string
*      example:
*        _id: "647cb133b56cd544f2fc2700"
*        title: "teclado"
*        description: "verde"
*        category: "electronica"
*        price: 2600
*        thumbnail: "Sin imagen"
*        code: "abc123"
*        stock: 158
*        status: true
*        __v: 0

*    ProductListResponse:
*      type: object
*      properties:
*        status:
*          type: string
*          enum: ["success"]
*        payload:
*          type: object
*          properties:
*            docs:
*              type: array
*              items:
*                $ref: '#/components/schemas/ProductList'
*            totalDocs:
*              type: integer
*            limit:
*              type: integer
*            totalPages:
*              type: integer
*            page:
*              type: integer
*            pagingCounter:
*              type: integer
*            hasPrevPage:
*              type: boolean
*            hasNextPage:
*              type: boolean
*            prevPage:
*              type: integer
*            nextPage:
*              type: integer
*            nextLink:
*              type: string
*            prevLink:
*              type: string
*            category:
*              type: boolean
*      example:
*        status: "success"
*        payload:
*          docs: 
*            - _id: "647cb133b56cd544f2fc2700"
*              title: "teclado"
*              description: "verde"
*              category: "electronica"
*              price: 2600
*              thumbnail: "Sin imagen"
*              code: "abc123"
*              stock: 158
*              status: true
*              __v: 0
*            - _id: "647cb133badsasdasdasd2700"
*              title: "Mouse"
*              description: "Azul"
*              category: "electronica"
*              price: 1600
*              thumbnail: "Sin imagen"
*              code: "eqdasd11123"
*              stock: 18
*              status: true
*              __v: 0
*          totalDocs: 22
*          limit: 2
*          totalPages: 3
*          page: 1
*          pagingCounter: 1
*          hasPrevPage: false
*          hasNextPage: true
*          prevPage: null
*          nextPage: 2
*          nextLink: "?limit=10&page=2"
*          prevLink: null
*          category: false
*/

/**
 * @swagger
 * tags:
 *    name: Products 
 *    description: The products managing API
 * /api/products:
 *  get:
 *   summary: Returns a list of products
 *   tags: [Products]
 *   responses:
 *     200:
 *       description: The list of products
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/ProductListResponse'
 *     500:
 *       description: Some server error
 */
productsRouter.get('/', productsController.getProducts);

/**
 * @swagger
 * tags:
 *    name: Products
 *    description: The products managing API
 * 
 * /api/products/{pid}:
 *  get:
 *   summary: Gets a product by id
 *   tags: [Products]
 *   parameters:
 *     - in: path
 *       name: pid
 *       schema:
 *        type: string
 *       required: true
 *   responses:
 *    200:
 *     description: The product was successfully retrieved
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ProductToAddResponse'
 *    500:
 *     description: Some server error
 */
productsRouter.get('/:pid', productsController.getProductById)

/** 
 * @swagger
 * tags:
 *    name: Products
 *    description: The products managing API
 * 
 * /api/products:
 *  post:
 *   summary: Creates a new product
 *   tags: [Products]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/ProductToAdd'
 *   responses: 
 *    201:
 *     description: The product was successfully created
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/ProductToAddResponse'
 *    500:
 *     description: Some server error 
 */
productsRouter.post('/', middlewarePassportJWT, productsController.addProduct);

/**
 * @swagger
 * tags:
 *    name: Products
 *    description: The products managing API
 * 
 * /api/products/{pid}:
 *  put:
 *   summary: Updates a product
 *   tags: [Products]
 *   parameters:
 *     - in: path
 *       name: pid
 *       schema: 
 *          type: string
 *       required: true
 *       description: The id of the product to update
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/ProductToUpdate'
 *   responses:
 *    201:
 *     description: The product was successfully updated
 *     content:
 *       application/json:
 *         schema:
 *           type: object        
 *           example:
 *             status: "success"
 *             payload:
 *               acknowledged: true
 *               modifiedCount: 1
 *               upsertedId: null
 *               upsertedCount: 1
 *               matchedCount: 1    
 *    500:
 *     description: Some server error
 * 
 */
productsRouter.put('/:pid', productsController.updateProduct);

/**
 * @swagger
 * tags:
 *    name: Products
 *    description: The products managing API
 * 
 * /api/products/{pid}:
 *  delete:
 *   summary: Deletes a product
 *   tags: [Products]
 *   parameters:
 *     - in: path
 *       name: pid
 *       schema: 
 *          type: string
 *       required: true
 *       description: The id of the product
 *   responses:
 *    201:
 *     description: The product was deleted successfully 
 *     content:
 *       application/json:
 *         schema:
 *           type: object        
 *           example:
 *             status: "success"
 *             payload:
 *               acknowledged: true
 *               deletedCount: 1
 *    500:
 *     description: Some server error
*/
productsRouter.delete('/:pid', middlewarePassportJWT, productsController.deleteProduct);

export { productsRouter };