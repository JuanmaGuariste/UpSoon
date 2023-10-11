import ProductRepository from "../repositories/products.repository.js";
import productDAO from "../dao/mongo/ProductDAO.js";

const productsService = new ProductRepository(productDAO);

export default productsService;