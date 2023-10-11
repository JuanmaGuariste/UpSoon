import cartModel from "../models/carts.model.js";

class CartDAO {
    constructor() {
        this.model = cartModel;
    }
    
    async getCartById(cid) {
        return await this.model.findOne({ _id: cid }).populate('products.product').lean();
    }

    async addProductToCart(pid, cid) {
        let cart = await this.model.findOne({ _id: cid });
        const productIndex = cart.products.findIndex(obj => obj.product.toString() === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].cant += 1;
        } else {
            cart.products.push({ product: pid, cant: 1 });
        }
        return await this.model.updateOne({ _id: cid }, cart);
    }

    async addCart() {        
        return await this.model.create({});
    } 

    async deleteCart(cid) {
        if (!cid) {
            throw new Error('Missing required fields');
        }
        return await this.model.deleteOne({ _id: cid });
    }

    async deleteProductFromCart(pid, cid) { 
        return await this.model.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: { product: pid } } },
            { new: true }
        );
    }

    async deleteCartContent(cid) {
        return await this.model.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: {} } },
            { new: true }
        );
    }
    
    async updateCart(cid, prod) {
        if (!cid) {
            throw new Error('Missing required fields');
        }
        let cart = await this.model.findOne({ _id: cid });
        cart.products = [];
        for (let i = 0; i < prod.length; i++){
            cart.products.push(prod[i]);
        }
        return await this.model.updateOne({ _id: cid }, cart);      
    }
    
    async updateProductInCart(pid, cid, newCant) {
        return await this.model.findOneAndUpdate(
            { _id: cid, "products.product": pid },
            { $set: { "products.$.cant": newCant} },
            { new: true }
        );
    }
}

const cartDAO = new CartDAO();

export default cartDAO;