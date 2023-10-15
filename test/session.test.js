import chai from 'chai';
import supertest from 'supertest';



const expect = chai.expect;
const request = supertest("https://upsoona.up.railway.app");


describe('Test de integracion - Sesiones', async () => {
    let cookie = {};
    let userId;

    // after(() => {
    //     request.delete(`/api/users/${userId}`)
    //         .then((result) => {
    //             const { _body } = result;
    //             expect(_body).to.be.ok;
    //             expect(_body.payload).to.be.ok;
    //             expect(_body.payload.deletedCount).to.be.ok.and.equal(1);
    //         })
    // })

    it('Se debe poder registrar un usuario correctamente', async () => {

        let user = {
            first_name: "Juan Manuel",
            last_name: "Perez",
            email: "jmperez@gmail.com",
            password: "1234",
            age: 27,
            img: "",
        }
        // user = await usersController.createUser(newUser);
        const result = await request.post("/api/users").send(user)
        expect(result).to.be.ok
        // request.post("/api/users").send(user)
        //     .then((result) => {              
        //         expect(result).to.be.ok
        //     })
        // const { _body } = result;
        // userId = _body.payload._id;
        // expect(_body).to.be.ok;

    })

    // it('Se debe poder iniciar sesion correctamente (USO DE COOKIE)', () => {
    //     const user = {
    //         email: 'jwuan@perez2.com',
    //         password: '123'
    //     }

    //     request.post("/api/sessions/login").send(user)
    //         .then((result) => {
    //             const cookieResult = result.headers["set-cookie"][0];

    //             expect(cookieResult).to.be.ok;

    //             cookie = {
    //                 name: cookieResult.split("=")[0],
    //                 value: cookieResult.split("=")[1],
    //             };

    //             expect(cookie.name).to.be.ok.and.equal("coderCookie");
    //             expect(cookie.value).to.be.ok;
    //         })
    // });

    // it('La coockie del usuario debe ser enviada y desecturada correctamente', () => {
    //     request
    //         .get("/api/sessions/current")
    //         .set("Cookie", [`${cookie?.name}=${cookie?.value}`])
    //         .then((result) => {
    //             const { _body } = result;
    //             expect(_body.payload).to.be.ok;
    //             expect(_body.payload.email).to.be.ok.and.equal('jwuan@perez2.com');
    //         })
    // });

});