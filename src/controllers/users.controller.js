import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

import usersService from '../services/users.service.js';
import productsService from '../services/products.service.js';

export default class UsersController {
	async home(req, res) {
		res.redirect('/products');
	}

	async getUsers(req, res) {
		try {
			let user = await usersService.getAllUsers();
			res.status(201).send({ status: "success", payload: user });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async deleteUsers(req, res) {
		try {
			let users = await usersService.getAllUsers();
			let currentDate = new Date();
			const inactivityThreshold = 2880; // 2 días de inactividad
			const limitDate = new Date(currentDate.getTime() - inactivityThreshold * 60000);
			const inactiveUsers = users.filter(user => user.last_connection < limitDate);
			for (const user of inactiveUsers) {
				await fetch(`http://localhost:8080/api/mails/inactiveUsers/${user._id}/`, {
					method: 'GET'
				});
			}
			res.status(201).send({ status: "success", payload: inactiveUsers });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async deleteUser(req, res) {
		let uid = req.params.uid;
		try {
			let user = await usersService.deleteUser(uid);
			res.status(201).send({ status: "success", payload: user });
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async github(req, res) { }

	githubCallback(req, res) {
		req.session.user = req.user;
		let user = req.session.user
		const token = jwt.sign({ _id: user._id }, 'privatekey', { expiresIn: '1h' });
		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 6000000,
		}).redirect('/products');
	}
	async logout(req, res) {
		try {
			let user = req.user
			user = await usersService.getUserByEmail(user.email);
			user.last_connection = new Date();
			await usersService.updateUser(user._id, user);
			res.clearCookie('token');
			res.redirect('/login');
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async login(req, res) {
		const { email, password } = req.body;
		let user = {};
		try {
			if (email === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
				user = {
					first_name: "Coder",
					last_name: "House",
					email: email,
					age: 26,
					password: password,
					img: "https://pbs.twimg.com/profile_images/1465705281279590405/1yiTdkKj_400x400.png",
					rol: "admin",
					cart: "",
					documents: [],
					last_connection: new Date(),
					_id: "coder",

				};
			} else {
				user = await usersService.getUserByEmail(email);
				if (!user) {
					return res.redirect('/login');
				}

				user.last_connection = new Date();
				await usersService.updateUser(user._id, user);
				if (!bcrypt.compareSync(password, user.password)) {
					return res.redirect('/loginError');
				}
			}
			const token = jwt.sign({ _id: user._id }, 'privatekey', { expiresIn: '1h' });

			res.cookie('token', token, {
				httpOnly: true,
				maxAge: 6000000,
			}).redirect('/products');
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.redirect('/loginError');
		}
	}

	async premium(req, res) {
		let uid = req.params.uid;
		let userRol = req.body;
		try {
			let user = await usersService.getUserById(uid);
			if (!user) {
				res.status(401).send({ status: "error", error: "Usuario no encontrado" })
				return;
			}
			if ((`${userRol.rol}` === "user")) {
				user.status = false
				user.rol = `${userRol.rol}`;
			} else if (user.status && (`${userRol.rol}` === "premium")) {
				user.rol = `${userRol.rol}`;
			} else if ((!user.status) && (`${userRol.rol}` === "premium")) {
				res.status(401).send({ status: "error", error: "Primero debe subir los archivos" })
				return;
			}
			user = await usersService.updateUser(uid, user);
			res.status(201).send({ status: "success", payload: user.first_name })
		}
		catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async setUser(req, res) {
		let uid = req.params.uid;
		let rol = req.params.rol;
		try {
			let user = await usersService.getUserById(uid);
			if (!user) {
				res.status(401).send({ status: "error", error: "Usuario no encontrado" })
				return;
			}
			if (`${rol}` == "user"){
				user.status = false;
				user.rol = `${rol}`;				
			} else if ((`${rol}` == "premium" )||  (`${rol}` == "admin" )){
				user.status = true;
				user.rol = `${rol}`;;	
			}
			user = await usersService.updateUser(uid, user);
			res.status(201).send({ status: "success", payload: user.first_name })
		} catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}

	async uploadDocuments(req, res) {
		let uid = req.params.uid;
		let pid = req.body.productID;
		try {
			let user = await usersService.getUserById(uid);
			if (!user.documents) {
				user.documents = [];
			}
			if (req.files["profile"]) {
				user.img = `/profiles/${req.files.profile[0].filename}`;
			} else if (req.files["products"]) {
				let product = await productsService.getProductById(pid);
				product.thumbnail = `/products/${req.files.products[0].filename}`;
				await productsService.updateProduct(pid, product);
				product = await productsService.getProductById(pid);
			} else if (req.files["products"] || req.files["address"] || req.files["account"]) {
				const identificationFile = req.files["identification"];
				const addressFile = req.files["address"];
				const accountFile = req.files["account"];
				if (!identificationFile || !addressFile || !accountFile) {
					return res.status(400).send({ status: "error", error: "Falta algún archivo" });
				}
				const documentsToAdd = [
					{
						name: identificationFile[0].filename,
						reference: identificationFile[0].path,
					},
					{
						name: addressFile[0].filename,
						reference: addressFile[0].path,
					},
					{
						name: accountFile[0].filename,
						reference: accountFile[0].path,
					},
				];
				user.documents.push(...documentsToAdd);
				user.status = true
			}
			user = await usersService.updateUser(uid, user);
			res.send("Files uploaded successfully");
		}
		catch (err) {
			req.logger.error(`Error information: ${err}`);
			res.status(500).send({ status: "error", error: err })
		}
	}
}