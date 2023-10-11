import Assert from 'assert';
import productDAO from '../../src/dao/mongo/ProductDAO.js';
import mongoose from 'mongoose';
import environment from '../../src/config/environment.js';
import chai from 'chai';

await mongoose.connect(environment.MONGO_URL);
const productDao = productDAO;
const expect = chai.expect;
const assert = Assert.strict

describe('ProductDAO - MongoDB', async () => {
    // before(async function () {
    //     await mongoose.connection.collection('products').drop()
    // })
    beforeEach(function () {
        this.timeout(10000);
    });

    it('El DAO debe agregar un producto correctamente a la base de datos de MongoDB y posteriormente, eliminarlo', async () => {

        const mockProduct = {
            title: "Celular Motorola aa",
            description: "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM.",
            category: "Celulares",
            price: 400000,
            thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true",
            code: "12dsgfdfgds2ew3",
            stock: 10,
            status: true
        }
        const result = await productDAO.addProduct(mockProduct)

        expect(result._id).to.be.ok
        expect(result).to.have.property("_id")
        expect(result).to.have.property("title", "Celular Motorola aa");
        expect(result).to.have.property("description", "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM.");
        expect(result).to.have.property("category", "Celulares");
        expect(result).to.have.property("price", 400000);
        expect(result).to.have.property("thumbnail", "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true");
        expect(result).to.have.property("code", "12dsgfdfgds2ew3");
        expect(result).to.have.property("stock", 10);
        expect(result).to.have.property("status", true);
        expect(result).to.have.property("owner");

        const deletedProduct = await productDAO.deleteProduct(result._id)
        expect(deletedProduct).to.be.ok
    });

    it('El DAO debe permitir obtener un producto por ID', async () => {

        const mockProduct = {
            title: "Celular Motorola aa",
            description: "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM.",
            category: "Celulares",
            price: 400000,
            thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true",
            code: "12dsgfdfgds2ew3",
            stock: 10,
            status: true
        }
        const result = await productDAO.addProduct(mockProduct)

        expect(result._id).to.be.ok
        expect(result).to.have.property("_id")
        expect(result).to.have.property("title", "Celular Motorola aa");
        expect(result).to.have.property("description", "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM.");
        expect(result).to.have.property("category", "Celulares");
        expect(result).to.have.property("price", 400000);
        expect(result).to.have.property("thumbnail", "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true");
        expect(result).to.have.property("code", "12dsgfdfgds2ew3");
        expect(result).to.have.property("stock", 10);
        expect(result).to.have.property("status", true);
        expect(result).to.have.property("owner");

        const newProduct = await productDAO.getProductById(result._id)
        expect(newProduct._id).to.be.ok
        expect(newProduct).to.have.property("_id")
        expect(newProduct).to.have.property("title", "Celular Motorola aa");
        expect(newProduct).to.have.property("description", "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM.");
        expect(newProduct).to.have.property("category", "Celulares");
        expect(newProduct).to.have.property("price", 400000);
        expect(newProduct).to.have.property("thumbnail", "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true");
        expect(newProduct).to.have.property("code", "12dsgfdfgds2ew3");
        expect(newProduct).to.have.property("stock", 10);
        expect(newProduct).to.have.property("status", true);
        expect(newProduct).to.have.property("owner");

        const deletedProduct = await productDAO.deleteProduct(newProduct._id)
        expect(deletedProduct).to.be.ok
    });

    it('El DAO debe permitir actualizar un producto un producto correctamente de la base de datos de MongoDB y posteriormente, eliminarlo', async () => {

        let mockProduct = {
            title: "Celular Motorola aa2",
            description: "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM.",
            category: "Celulares",
            price: 400000,
            thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true",
            code: "qweqweqwe",
            stock: 10,
            status: true
        }

        let addedProduct = await productDAO.addProduct(mockProduct)
        expect(addedProduct._id).to.be.ok

        mockProduct = { ...mockProduct, description: "Celular usado.", price: 200000 }

        let result = await productDAO.updateProduct(`${addedProduct._id}`, mockProduct)
        expect(result).to.have.property("acknowledged", true);

        let updatedProduct = await productDAO.getProductById(`${addedProduct._id}`)
        expect(updatedProduct).to.have.property("description", "Celular usado.");
        expect(updatedProduct).to.have.property("category", "Celulares");
        expect(updatedProduct).to.have.property("price", 200000);
        expect(updatedProduct).to.have.property("thumbnail", "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true");
        expect(updatedProduct).to.have.property("code", "qweqweqwe");
        expect(updatedProduct).to.have.property("stock", 10);
        expect(updatedProduct).to.have.property("status", true);
        expect(updatedProduct).to.have.property("owner");

        const deletedProduct = await productDAO.deleteProduct(addedProduct._id)
        expect(deletedProduct).to.be.ok
    });  
})