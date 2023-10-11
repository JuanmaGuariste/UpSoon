import Assert from 'assert';
import cartDAO from '../../src/dao/mongo/CartDAO.js';
import productDAO from '../../src/dao/mongo/ProductDAO.js';
import mongoose from 'mongoose';
import environment from '../../src/config/environment.js';
import chai from 'chai';

await mongoose.connect(process.env.MONGO_URL);
const cartDao = cartDAO;
const expect = chai.expect;
const assert = Assert.strict

describe('CartDAO - MongoDB', async () => {
    // before(async function () {
    //     await mongoose.connection.collection('carts').drop()
    // })
    beforeEach(function () {
        this.timeout(10000);
    });

    it('El DAO debe poder crear un carrito correctamente de la base de datos de MongoDB y posteriormente, eliminarlo', async () => {
        const newCart = await cartDAO.addCart()
        expect(newCart._id).to.be.ok
        expect(newCart).to.have.deep.property('products', []);

        const deletedCart = await cartDAO.deleteCart(newCart._id)
        expect(deletedCart).to.be.ok
    });
    it('El DAO debe poder agregar productos al carrito correctamente de la base de datos de MongoDB y posteriormente, eliminarlo', async () => {
        const cart = await cartDAO.addCart()
        const mockProduct = {
            title: "Celular Motorola aa",
            description: "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM.",
            category: "Celulares",
            price: 400000,
            thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true",
            code: "12dsgfdfgdskyukyt2ew3",
            stock: 10,
            status: true
        }
        const product = await productDAO.addProduct(mockProduct)
        expect(product._id).to.be.ok
        expect(product).to.have.property("_id")
        expect(product).to.have.property("title", "Celular Motorola aa");

        const result = await cartDAO.addProductToCart(product._id, cart._id);
        expect(result).to.be.ok

        const deletedProduct = await productDAO.deleteProduct(product._id)
        expect(deletedProduct).to.be.ok

        const deletedCart = await cartDAO.deleteCart(cart._id)
        expect(deletedCart).to.be.ok
    });
    it('El DAO debe poder actualizar los productos del carrito correctamente de la base de datos de MongoDB y posteriormente, eliminarlo', async () => {
        const cart = await cartDAO.addCart()
        expect(cart._id).to.be.ok
        expect(cart).to.have.deep.property('products', []);
        const mockProduct1 = {
            title: "Celular Motorola aa",
            description: "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM.",
            category: "Celulares",
            price: 400000,
            thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true",
            code: "12dsgfdfgdskyukyt2ew3",
            stock: 10,
            status: true
        }
        const mockProduct2 = {
            title: "Mate",
            description: "Termico",
            category: "Bazar",
            price: 5000,
            thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true",
            code: "kkkiiiskyukyt2ew3",
            stock: 100,
            status: true
        }
        let productToAdd1 = await productDAO.addProduct(mockProduct1)
        expect(productToAdd1._id).to.be.ok
        let productToAdd2 = await productDAO.addProduct(mockProduct2)
        expect(productToAdd2._id).to.be.ok

        let products = [
                {
                    "product": productToAdd1._id,
                    "cant": 2
                },
                {
                    "product": productToAdd2._id,
                    "cant": 1
                }
            ]      

        const result = await cartDAO.updateCart(cart._id, products);
        expect(result).to.be.ok

        let deletedProduct = await productDAO.deleteProduct(productToAdd1._id)
        expect(deletedProduct).to.be.ok
        deletedProduct = await productDAO.deleteProduct(productToAdd2._id)
        expect(deletedProduct).to.be.ok

        const deletedCart = await cartDAO.deleteCart(cart._id)
        expect(deletedCart).to.be.ok
    }); 
})