export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getCartById(id) {
        return await this.dao.getCartById(id);
    }

    async addProductToCart(pid, cid) {        
        return await this.dao.addProductToCart(pid, cid);
    }

    async addCart() {
        return await this.dao.addCart();
    }

    async deleteCart(cid) {
        return await this.dao.deleteCart(cid);
    }

    async deleteProductFromCart(pid, cid) {
        return await this.dao.deleteProductFromCart(pid, cid);
    }

    async deleteCartContent(cid) {
        return await this.dao.deleteCartContent(cid);
    }
    async updateCart(cid, prod) {
        return await this.dao.updateCart(cid, prod);
    }

    async updateproductInCart(cid, prod) {
        return await this.dao.updateproductInCart(cid, prod);
    }
}
