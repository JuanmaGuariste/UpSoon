import cartsService from '../services/carts.service.js';
import productsService from '../services/products.service.js';

export default class CartsController {

	async addCart(req, res) {
		try {
			let newCart = await cartsService.addCart();
			res.status(201).send({ status: "success", payload: newCart });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async addProductToCart(req, res) {
		let cid = req.params.cid;
		let pid = req.params.pid;
		let user = req.user;
		try {
			let product = await productsService.getProductById(pid);
			if (`${user._id}` === `${product.owner}`) {
				return 0
			}
			let cart = await cartsService.addProductToCart(pid, cid);
			if (!cart) {
				res.status(403).send({ status: "success", error: "Product owner" })
				return 0
			}
			res.status(201).send({ status: "success", payload: cart });
		}
		catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async deleteProductFromCart(req, res) {
		let cid = req.params.cid;
		let pid = req.params.pid;
		try {
			await cartsService.deleteProductFromCart(pid, cid);
			res.status(201).send({ status: "success", payload: { "ProdID": pid } });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}
	async deleteCartContent(req, res) {
		let cid = req.params.cid;
		try {
			await cartsService.deleteCartContent(cid);
			res.status(201).send({ status: "success", payload: { "CartId": cid } });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async updateProductInCart(req, res) {
		let pid = req.params.pid;
		let cid = req.params.cid;
		let newCant = parseInt(req.body.cant)
		try {
			await cartsService.updateProductInCart(pid, cid, newCant);
			res.status(201).send({ status: "success", payload: { "CartId": cid } });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}
	async getCartById(req, res) {
		let id = req.params.cid
		try {
			let cart = await cartsService.getCartById(id);
			res.status(201).send({ status: "success", payload: cart });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async deleteCart(id) {
		try {
			let cart = await cartsService.deleteCart(id);
			res.status(201).send({ status: "success", payload: cart });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async updateCart(req, res) {
		let cid = req.params.cid;
		try {
			await cartsService.updateCart(cid, req.body.products);
			res.status(201).send({ status: "success", payload: { "CartId": cid } });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}
}