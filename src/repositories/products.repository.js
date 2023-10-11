export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getProducts(limit, page, category, status, sort) {
        return await this.dao.getProducts(limit, page, category, status, sort);
    }

    async getAllProducts() {
        return await this.dao.getAllProducts();
    }

    async getProductById(id) {
        return await this.dao.getProductById(id);
    }

    async addProduct(product) {
        return await this.dao.addProduct(product);
    }

    async updateProduct(id, product) {
        return await this.dao.updateProduct(id, product);
    }

    async deleteProduct(id) {
        return await this.dao.deleteProduct(id);
    }
}