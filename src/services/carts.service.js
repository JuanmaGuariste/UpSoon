import CartsRepository from "../repositories/carts.repository.js";
import cartDAO from "../dao/mongo/CartDAO.js";

const cartsService = new CartsRepository(cartDAO);

export default cartsService