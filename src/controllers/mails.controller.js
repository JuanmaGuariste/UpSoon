import ticketsService from '../services/tickets.service.js';
import nodemailer from 'nodemailer';
import environment from '../config/environment.js';
import usersService from '../services/users.service.js';
import { logger } from '../middleware/logger.middleware.js';
import { generateJWTToken } from '../config/passport.config.js';
import bcrypt from 'bcrypt';
import { hashPassword } from '../utils/encrypt.utils.js';
import Swal from 'sweetalert2';
import productsService from '../services/products.service.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export default class MailsController {
    async createMail(req, res) {
        let ticketId = req.params.tid;
        try {
            let ticket = await ticketsService.getTicketById(ticketId);
            const htmlContent = `
            <h1>Detalles del Ticket</h1>
            <p><strong>Código del Ticket:</strong> ${ticket.code}</p>
            <p><strong>Fecha de Compra:</strong> ${ticket.purchase_datetime}</p>
            <p><strong>Monto Total:</strong> ${ticket.amount}</p>
            <p><strong>Comprador:</strong> ${ticket.purchaser}</p>
        `;
            const mailOptions = {
                from: `UpSoon Ecommerce <${process.env.EMAIL}>`,
                to: process.env.EMAIL,
                subject: 'UpSoon - Ticket de compra',
                html: htmlContent,
                // attachments: [{
                //     filename: 'ticket.txt',
                //     content: htmlContent,
                // }],
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    req.logger.error(`Error information: ${error}`);
                }
                req.logger.info('Email sent: ' + info.response);
            });

            res.status(201).send({ status: "success", payload: ticket });
        } catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }

    async deleteProductMail(req, res) {
        let pid = req.params.pid;
        try {            
            let product = await productsService.getProductById(`${pid}`); 
             let user = await usersService.getUserById(`${product.owner}`);
             
            const htmlContent = `
            <p><strong>Hola, ${user.first_name}. Te informamos que tu producto "${product.title}" fue eliminada de UpSoon.</p>   
            <h1>Detalles del producto</h1>
            <p><strong>Descripción:</strong> ${product.description}</p>
            <p><strong>Categoría:</strong> ${product.category}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
            <p><strong>Precio: </strong>$${product.price}</p>         
        `;
            const mailOptions = {
                from: `UpSoon Ecommerce <${process.env.EMAIL}>`,
                to: process.env.EMAIL,//TODO: cambiar por user mail
                // to: user.EMAIL,
                subject: 'UpSoon - Producto eliminado',
                html: htmlContent,
                // attachments: [{
                //     filename: 'ticket.txt',
                //     content: htmlContent,
                // }],
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    req.logger.error(`Error information: ${error}`);
                }
                req.logger.info('Email sent: ' + info.response);
            });
            product = await productsService.deleteProduct(pid);
            res.status(201).send({ status: "success", payload: product });
        } catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }

    async restorePasswordMail(req, res) {
        let userEmail = req.params.userEmail;
        try {
            let user = await usersService.getUserByEmail(userEmail);
            if (!user) {
                logger.error(`El usuario no existe: ${user}`);
                return res.status(401).send({ status: "error", error: "El usuario no existe" });
            } else {
                let tokenParams = {
                    userId: user._id,
                    username: user.first_name,
                };
                let token = await generateJWTToken(tokenParams)
                const htmlContent = `
                                <h1>Restauración de contraseña</h1>
                                <p><strong>Hola,  ${user.first_name}. Hemos recibido tu solicitud de restauración de contraseña.</p>
                                <p><strong>Haz click en el siguiente enlace para restablecer tu contraseña</strong></p>
                                <p><a href="${process.env.BASE_URL}:${process.env.PORT}/restore-password/uid/${user._id}/token/${token}" style="text-decoration: none; background-color: #007bff; color: #fff; padding: 5px 10px; border-radius: 5px;">Restaurar contraseña</a></p>
                                <p><strong>Si no realizaste esta solicitud, puedes ignorar este correo.</p>                             
                            `;
                const mailOptions = {
                    from: `UpSoon Ecommerce <${process.env.EMAIL}>`,
                    to: process.env.EMAIL, //TODO: cambiar por user mail
                    // to: user.EMAIL, 
                    subject: 'UpSoon - Restauración de contraseña',
                    html: htmlContent,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        logger.error(`Error information: ${error}`);
                    }
                    logger.info('Email sent: ' + info.response);
                });
            }
            res.status(201).send({ status: "success", payload: user });
        } catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }

    async restorePassword(req, res) {
        let { password } = req.body;
        let userId = req.params.userId;        
        try {
            let user = await usersService.getUserById(userId);
            if (bcrypt.compareSync(password, user.password)) {
                req.logger.error(`No se puede utilizar la misma contraseña`);
            } else {
                const hashedPassword = hashPassword(password);
                let newUser = {
                    password: hashedPassword,
                }
                user = await usersService.updateUser(userId, newUser);
            }
            res.redirect('/login');
        } catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.redirect('/loginError');
        }
    }

    async inactiveUsers(req, res) {
        let uid = req.params.uid;
        try {
            let user = await usersService.getUserById(uid);
            const htmlContent = `
            <p><strong>Hola, ${user.first_name}. Te informamos que tu cuenta fue eliminada de UpSoon debido a tu inactividad.</p>
            <p><strong>Tu última conexión fue realizada el día:</strong> ${user.last_connection}</p>
            <p><strong>Esperamos que vuelvas pronto</p>
        `;
            const mailOptions = {
                from: `UpSoon Ecommerce <${process.env.EMAIL}>`,
                to: process.env.EMAIL,//TODO: cambiar por user mail
                // to: user.EMAIL,
                subject: 'UpSoon - Eliminado de cuenta por inactividad',
                html: htmlContent,
                // attachments: [{
                //     filename: 'ticket.txt',
                //     content: htmlContent,
                // }],
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    req.logger.error(`Error information: ${error}`);
                }
                req.logger.info('Email sent: ' + info.response);
            });
            await usersService.deleteUser(uid);
            res.status(201).send({ status: "success", payload: user });
        } catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }
    
}