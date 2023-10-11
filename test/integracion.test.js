import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const request = supertest('http://localhost:8080');

describe('Test de integracion', () => {
    it('El endpoint POST api/products debe crear un producto satisfactoriamente', async () => {
        const product = {
            title: "Celular Motorola",
            description: "Celular Motorola 5G color negro de 256BG de almacenamiento interno y 8GB de RAM.",
            category: "Celulares",
            price: 400000,
            thumbnail: "https://armoto.vtexassets.com/arquivos/ids/164305-1200-auto?v=638291943522970000&width=1200&height=auto&aspect=true",
            code: "12dsgfdfgds2ew3",
            stock: 10,
            status: true
        }
        const { statusCode, _body } = await request.post('/api/products').send(product);
        expect(res.status).to.be.equal(201);
    });

})