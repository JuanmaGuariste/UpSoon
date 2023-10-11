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
            const app = module.default;
            const webServer = app.listen(3000);
            setupMaster(webServer, {
                loadBalancingMethod: "least-connection",
            });
            setupPrimary();
            cluster.setupPrimary({
                serialization: "advanced",
            });
            let cpuCount = os.cpus().length;
            for (let i = 0;  (i < cpuCount)&&(i < process.env.MAX_CPU_COUNT); i++) {
                cluster.fork();
            }            
            cluster.on("exit", (worker) => {
                logger.error(`Worker ${worker.process.pid} died`);
                cluster.fork();
            });
        })
} else {
    logger.info(`Worker ${process.pid} started`);
    try{
        io = await socketio.socketio();
        io.adapter(createAdapter());
        setupWorker(io);
        emitter.on("new-product", async (product) => {
            let totalProducts = [];
            try {
                totalProducts = await productsService.getAllProducts()
                io.emit('totalProducts', JSON.stringify(totalProducts));
            } catch (err) {
                logger.error(err)
            }
        })
    } catch (err) {
        logger.error(err)
    }
}