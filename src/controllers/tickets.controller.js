import ticketsService from '../services/tickets.service.js';
import cartsService from '../services/carts.service.js';
import productsService from '../services/products.service.js';
import _ from 'mongoose-paginate-v2';

export default class TicketsController {	

	async getTickets() {
		try {
			let tickets = await ticketsService.getTickets();
			res.status(201).send({ status: "success", payload: tickets });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async getTicketById(tid) {
		try {
			let ticket = await ticketsService.getTicketById(tid);
			res.status(201).send({ status: "success", payload: ticket });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}
	async getTicketByEmail(uEmail) {
		try {

			let ticket = await ticketsService.getTicketByEmail(uEmail);
			res.status(201).send({ status: "success", payload: ticket });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async addTicket(req, res) {
		let cid = req.params.cid;
		const user = req.user
		let productsOk = [];
		let productsNotOk = [];
		let totalPrice = 0;
		try {
			let cart = await cartsService.getCartById(cid);
			for (const el of cart.products) {
				let prod = await productsService.getProductById(el.product._id);
				if (prod.stock - el.cant >= 0) {
					prod.stock -= el.cant;
					await productsService.updateProduct(prod._id, prod);
					await cartsService.deleteProductFromCart(el.product._id, cid)
					let prodAuxOk = {
						title: prod.title,
						cant: el.cant,
						price: prod.price,
						_id: prod._id
					};
					productsOk.push(prodAuxOk);
				} else {
					let prodAuxNotOk = {
						title: prod.title,
						cant: el.cant,
						stock: prod.stock,
						price: prod.price
					};
					productsNotOk.push(prodAuxNotOk);
				}
			}

			let products =[];
			let prod = {}

			productsOk.forEach(el => {
				totalPrice += el.cant * el.price;
				prod = {
					product: el._id,
					cant: el.cant
				}
				products.push(prod);
			})			
			const timestamp = Date.now().toString();
			const ticketCode = `TICKET-${timestamp}`;

			let ticket = {
				code: ticketCode,
				amount: totalPrice,
				purchaser: user.email,
				products: products
			}
			ticket = await ticketsService.addTicket(ticket);
			await fetch(`http://localhost:8080/api/mails/ticket/${ticket._id}/`, {
				method: 'GET'
			});
			res.status(201).send({ status: "success", payload: { "ticket": ticket } });
		}
		catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}
}



