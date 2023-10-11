import { generateProducts } from '../utils/generate.js';

export default class MockingproductsController {
    async generateProducts(req, res) {
        let mockingProducts = [];
        try {
            mockingProducts = generateProducts();
            res.status(201).send({ status: "success", payload: mockingProducts })
        }
        catch (err) {
            req.logger.error(`Error information: ${err}`);
            res.status(500).send({ status: "error", error: err })
        }
    }
}