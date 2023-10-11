import { emitter } from '../emiter.js';
import { isValidProductDTO, isValidProductIdDTO } from '../dto/products.dto.js';
import productsService from '../services/products.service.js';
import MailsController from './mails.controller.js';
import usersService from '../services/users.service.js';

export default class ProductsController {
	async getProducts(req, res) {
		const { limit, page, category, status, sort } = req.query;
		try {
			let product = await productsService.getProducts(limit, page, category, status, sort);
			res.status(201).send({ status: "success", payload: product })
		}
		catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}
	async getProductById(req, res) {
		let id = req.params.pid;
		try {
			const product = await productsService.getProductById(id);
			res.status(201).send({ status: "success", payload: product })
		}
		catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}
	async getAllProducts() {
		try {
			let products = await productsService.getAllProducts();
			res.status(201).send({ status: "success", payload: products })
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async addProduct(req, res, next) {
		let user = req.user
		try {
			let product = req.body
			product.owner = user._id
			product = new isValidProductDTO(product)
			let prodComplete = await productsService.addProduct(product);
			emitter.emit('new-product', prodComplete);
			res.status(201).send({ status: "success", payload: product });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			next(err);
		}
	}

	async deleteProduct(req, res) {
		let user = req.user
		let id = req.params.pid;
		try {
			let prod = await productsService.getProductById(id);	
			let productOwner = await usersService.getUserById(`${prod.owner}`)			
			let respuesta = false;
			if (user.rol == "admin") {
				// respuesta = await productsService.deleteProduct(id);
				if (productOwner) {
					await fetch(`http://localhost:8080/api/mails/deleteproduct/${id}/`, {
						method: 'GET'
					});
					respuesta = true
				} else {
					respuesta = await productsService.deleteProduct(id);
				}
				emitter.emit('new-product', respuesta);
			} else if ((user.rol == "premium") && (`${prod.owner}` === `${user._id}`)) {
				respuesta = await productsService.deleteProduct(id);
				emitter.emit('new-product', respuesta);
			}
			res.status(201).send({ status: "success", payload: respuesta });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async updateProduct(req, res, next) {
		let id = req.params.pid;
		try {
			const pid = await isValidProductIdDTO(id)
			let prodUpdated = await productsService.updateProduct(pid, req.body);
			res.status(201).send({ status: "success", payload: prodUpdated });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			next(err);
		}
	}
}

const productsController = new ProductsController();