import productModel from '../models/products.model.js';
class ProductDAO {
    constructor() {
        this.model = productModel;
    }

    async getProducts(limit = 10, page = 1, category = false, status = false, sort = false) {
        let filter = {}
        let options = {
            lean: true,
            page,
            limit,
        }
        let link = `?limit=${limit}`

        if (category) {
            filter = { ...filter, category }
            link = link + `&category=${category}`
        }
        if (status) {
            filter = { ...filter, status }
            link = link + `&status=${status}`
        }
        if (sort === "asc") {
            options = { ...options, sort: { price: 1 } }
            link = link + `&sort=asc`
        } else if (sort === "desc") {
            options = { ...options, sort: { price: -1 } }
            link = link + `&sort=desc`
        }

        let products = await this.model.paginate(filter, options);        
        if (products.hasNextPage) {
            products.nextLink = link + `&page=${products.nextPage}`
        } else {
            products.nextLink = null;
        }

        if (products.hasPrevPage) {
            products.prevLink = link + `&page=${products.prevPage}`
        } else {
            products.prevLink = null;
        }

        products.category = category;
        return products
    }
    async getAllProducts() {
        return await this.model.find();
    }

    async getProductById(pid) {
        return await this.model.findOne({ _id: pid });
    }

    async addProduct(product) {
        return await this.model.create(product);
    }

    async updateProduct(pid, product) {
        if (!pid) {
            throw new Error('Missing required fields');
        }
        return await this.model.updateOne({ _id: pid }, product);
    }

    async deleteProduct(pid) {
        if (!pid) {
            throw new Error('Missing required fields');
        }
        return await this.model.deleteOne({ _id: pid });
    }
}

const productDAO = new ProductDAO();

export default productDAO;