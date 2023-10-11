import Assert from 'assert';
import userDAO from '../../src/dao/mongo/UserDAO.js';
import mongoose from 'mongoose';
import chai from 'chai';

await mongoose.connect(process.env.MONGO_URL);
const userDao = userDAO;
const expect = chai.expect;
const assert = Assert.strict

describe('UserDAO - MongoDB', async () => {
    before(async function () {
        await mongoose.connection.collection('users').drop()
    })
    beforeEach(function () {
        this.timeout(10000);
    });

    it('El DAO debe agregar un usuario correctamente a la base de datos de MongoDB', async () => {
        const mockUser = {
            first_name: 'Juan',
            last_name: 'Perez',
            email: 'juan.perez@mail.com',
            age: 20,
            password: '1234',
            img: '',
            rol: 'user',
            cart: []
        }
        const result = await userDAO.createUser(mockUser)
        expect(result._id).to.be.ok
        expect(result).to.have.property("_id")
        expect(result).to.have.property("first_name", "Juan");
        expect(result).to.have.property("last_name", "Perez");
        expect(result).to.have.property("email", "juan.perez@mail.com");
        expect(result).to.have.property("age", 20);
        expect(result).to.have.property("password", "1234");
        expect(result).to.have.property("img", "");
        expect(result).to.have.property("rol", "user");
        expect(result.cart).to.deep.equal([]);

    });
    it("El DAO debe agregar un array vacio por defecto al carrito del usuario", async () => {
        const mockUser = {
            first_name: 'Juan',
            last_name: 'Perez',
            email: 'juan.perez@mail.com',
            age: 20,
            password: '1234',
            img: '',
            rol: 'user',
            cart: []
        }
        const result = await userDAO.createUser(mockUser)

        expect(result.cart).to.deep.equal([]);
    });

    it("El DAO debe poder obtener el usuario por email", async () => {
        const mockUser = {
            first_name: 'Juan',
            last_name: 'Perez',
            email: 'juan.perez@mail.com',
            age: 20,
            password: '1234',
            img: '',
            rol: 'user',
            cart: []
        }

        await userDAO.createUser(mockUser)

        const user = await userDao.getUserByEmail("juan.perez@mail.com")

        expect(user._id).to.be.ok;
        expect(user.email).to.be.equal("juan.perez@mail.com");
        expect(user).to.have.property("email");
    })

    it("El DAO debe poder obtener el usuario por ID", async () => {
        const mockUser = {
            first_name: 'Juan',
            last_name: 'Perez',
            email: 'juan.perez@mail.com',
            age: 20,
            password: '1234',
            img: '',
            rol: 'user',
            cart: []
        }

        const mongoUser = await userDAO.createUser(mockUser)
        const user = await userDao.getUserById(mongoUser._id)

        expect(user._id).to.be.ok;
        expect(user.email).to.be.equal("juan.perez@mail.com");
    })

    afterEach(async function () {
        await mongoose.connection.collection('users').drop()
    })
})
