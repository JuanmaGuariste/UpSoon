import chai from 'chai';
import { hashPassword, comparePassword } from '../../src/utils/encrypt.utils.js';

const expect = chai.expect;

describe('Utils - Encrypt', () => {
    it('El metodo encryptPassword debe retornar una contraseña encriptada', () => {
        const password = "123456"
        const hash = hashPassword(password);
        expect(hash).to.not.be.equal(password)
    })
    it('El hash aplicado a la contraseña debe ser efectivo', () => {
        const password = "123456"
        const hash = hashPassword(password);
        const rejex = /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g;
        expect(hash).to.match(rejex);
    });
    it("Si la contraseña es modificada, no debe validarse la contraseña", () => {
        const password = "123456";
        const hash = hashPassword(password);
        const passwordModified = "1234567";

        const result = comparePassword(passwordModified, hash);

        expect(result).to.be.false;
    });
});