import { Server } from 'socket.io';
import productsService from './services/products.service.js';
import chatsService from './services/chats.service.js';
import { logger } from './middleware/logger.middleware.js';

let io;
const socketio = async () => {
    return new Promise((resolve) => {
        import("./app.js")
            .then((module) => {
                const app = module.default;
                const webServer = app.listen(process.env.PORT, () => {
                    logger.info(`Escuchando puerto ${process.env.PORT}`);
                });
                io = new Server(webServer);
                let totalProducts = [];
                let messages = [];
                io.on("connection", async (socket) => {
                    try {
                        totalProducts = await productsService.getAllProducts()
                        messages = await chatsService.getAllMessages()
                    } catch (err) {
                        logger.error(`${new Date().toISOString()} - Error information: ${err}`);
                    }
                    logger.info('Nuevo cliente conectado!');
                    socket.emit('totalProducts', JSON.stringify(totalProducts));
                    socket.on('new-product', async (product) => {
                        try {
                            totalProducts = await productsService.getAllProducts()
                        } catch (err) {
                            logger.error(`${new Date().toISOString()} - Error information: ${err}`);
                        }
                        io.emit('totalProducts', JSON.stringify(totalProducts));
                    });
                    socket.emit('messages', messages);
                    socket.on('message', async (message) => {
                        try {
                            await chatsService.addMessage(message)
                            messages = await chatsService.getAllMessages()
                            io.emit('messages', messages);
                        } catch (err) {
                            logger.error(`${new Date().toISOString()} - Error information: ${err}`);
                        }
                    });
                    socket.on('sayhello', (data) => {
                        socket.broadcast.emit('connected', data);
                    });
                });
                resolve(io);
            });

    })

}

export default {
    socketio
};