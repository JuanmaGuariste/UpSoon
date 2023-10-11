import productsService from "../services/products.service.js";
import cartsService from "../services/carts.service.js";
import usersService from "../services/users.service.js";
import ticketsService from "../services/tickets.service.js";
import Swal from 'sweetalert2';

export default class ViewsController {
    async getProducts(req, res) {
        const { limit, page, category, status, sort } = req.query;
        let uid = req.user._id
        try {
            if (!uid) {
                return res.redirect('/login')
            }
            let user = await usersService.getUserById(uid);
            let products = await productsService.getProducts(limit, page, category, status, sort);
            res.render('products', {
                products,
                user,
            });
        }
        catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }

    async myProducts(req, res) {
        const { limit, page, category, status, sort } = req.query;
        let uid = req.user._id
        try {
            let user = await usersService.getUserById(uid);
            let products = await productsService.getProducts(limit, page, category, status, sort);
            let userProducts = {};
            if (user.rol == "premium") {
                let filteredProducts = []
                products.docs.forEach(element => {
                    if (`${element.owner}` == uid) {
                        filteredProducts.push(element)
                    }
                });
                userProducts = {
                    docs: filteredProducts,
                    totalDocs: filteredProducts.length,
                };
            } else if (user.rol == "admin") {
                userProducts = products;
            }          
            res.render('myProducts', {
                userProducts,
                user,
            });
        }
        catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }

    async getCartById(req, res) {
        let id = req.params.cid.replace(/^'|'$/g, '');
        const user = req.user;
        try {
            let cart = await cartsService.getCartById(id);
            res.render('carts',
                {
                    title: 'Cart',
                    cart,
                    user,
                });
        } catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }

    realTimeProducts(req, res) {
        const user = req.user;
        res.render('realTimeProducts', {
            user,
        });
    }

    async chats(req, res) {
        const user = req.user;
        res.render('chat', {
            user,
        });
    }

    register(req, res) {
        res.render('register', {
            title: 'Registrar nuevo usuario',
        });
    }
    registerError(req, res) {
        res.render('registerError', {
            title: 'Error al registrar nuevo usuario',
        });
    }

    loginError(req, res) {
        res.render('loginError', {
            title: 'Error al iniciar sesión',
        });
    }

    async login(req, res) {
        res.render('login', {
            title: 'Inicio de sesión',
        });
    }

    home(req, res) {
        if (!req.user) {
            res.render('login', {
                title: 'Inicio de sesión',
            });
        } else {
            res.redirect('/products');
        }
    }

    async current(req, res) {
        try {
            let user = await usersService.getUserById(req.user._id);
            if (!user) {
                user = req.user;
                res.render('profile', {
                    title: 'Perfil de Usuario',
                    user,
                });
            } else {
                res.render('profile', {
                    title: 'Perfil de Usuario',
                    user,
                });
            }
        }
        catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }

    async restorePassword(req, res) {
        let userId = req.params.uid;
        let tokenHash = req.params.token;
        try {
            const jwt = await import('jsonwebtoken');
            const secretKey = process.env.SECRET_KEY;

            jwt.default.verify(tokenHash, secretKey, async (err, decoded) => {
                if (err) {
                    req.logger.error(err)
                    res.render('loginError', {
                        title: 'Token caducado',
                    });
                }
                if (decoded) {
                    let newUser = await usersService.getUserById(userId);
                    res.render('restorePassword', {
                        title: 'Restablecer contraseña',
                        newUser
                    });
                }
            });

        } catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }

    async userToPremium(req, res) {
        try {
            let user = await usersService.getUserById(req.user._id);
            if (!user) {
                user = req.user;
                res.render('premium', {
                    title: 'Usuario premium',
                    user,
                });
            } else {
                res.render('premium', {
                    title: 'Usuario premium',
                    user,
                });
            }
        } catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }

    async allUsers(req, res) {
        try {
            let users = await usersService.getAllUsers();
            res.render('allUsers', {                
                users,
            });
        }
        catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }
    async prevPurchase(req, res) {
        let user = req.user
        try {
             let  tickets = await ticketsService.getTicketByEmail(user.email);
             let products = []
             let auxProduct;
            //  for (let i=0; i<tickets.products.length; i++){
            //      auxProduct = await productsService.getProductById(`${tickets.products[i]._id}`)
            //      products.push(auxProduct)
            //  }
            res.render('prevPurchase', {                
                 user,
                 tickets,
            });
        }
        catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }
}