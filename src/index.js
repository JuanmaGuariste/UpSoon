import cluster from 'cluster';
import os from 'os';
import productsService from './services/products.service.js';
import { logger } from './middleware/logger.middleware.js';
import { setupMaster, setupWorker } from '@socket.io/sticky';
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';
import socketio from "./socketio.js";
import { emitter } from './emiter.js';

export let io;

if (cluster.isPrimary) {
    logger.info(`Primary ${process.pid} is running`);
    import("./app.js")
        .then((module) => {
            logger.info(`Estoy dentro de APP MODULE`);
            const app = module.default;
            const webServer = app.listen(3000);
            setupMaster(webServer, {
                loadBalancingMethod: "least-connection",
            });
            setupPrimary();
            logger.info(`Estoy despues de invocar el setupPrimary`);
            cluster.setupPrimary({
                serialization: "advanced",
            });
            logger.info(`Estoy despues de hacer el cluster en setupPrimary`);
            let cpuCount = os.cpus().length;
            logger.info(`CPU count: ---- ${cpuCount}`);
            cpuCount = cpuCount - 10;
            logger.info(`CPU count: ---- ${cpuCount}`);
            

            // for (let i = 0; i < cpuCount; i++) {
            for (let i = 0; i < 7; i++) {
                cluster.fork();
                logger.info(`CPU fork number${i}`);

            }
            cluster.on("exit", (worker) => {
                logger.error(`Worker ${worker.process.pid} died`);
                cluster.fork();
            });
        })
} else {
    console.log("ESTOY en el ELSE")
    logger.info(`Worker ${process.pid} started`);
    io = await socketio.socketio();
    io.adapter(createAdapter());
    setupWorker(io);
    console.log("ESTOY en el ELSE mas abajo")
    emitter.on("new-product", async (product) => {
        let totalProducts = [];
        try {
            totalProducts = await productsService.getAllProducts()
            io.emit('totalProducts', JSON.stringify(totalProducts));
        } catch (err) {
            logger.error(err)
        }
    })
}