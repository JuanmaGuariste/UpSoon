import UserDTO from "../dto/users.dto.js";
import ReducedUserDTO from "../dto/reducedUser.dto.js";

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAllUsers() {
        let users = await this.dao.getAllUsers();
        let reducedUser = [];
        users.forEach(user => {
            reducedUser.push(new ReducedUserDTO(user))
        });
        return reducedUser
    }

    async createUser(user) {
        return await this.dao.createUser(user);
    }

    async getUserById(id) {
        if (id === "coder") {
            return null
        } else {
            let user = await this.dao.getUserById(id);
            if (!user){
                return null            
            }

            return new UserDTO(user)
        }
    }

    async getUserByEmail(email) {
        return await this.dao.getUserByEmail(email);
    }

    async updateUser(id, user) {
        await this.dao.updateUser(id, user);
        return await this.dao.getUserById(id);
    }

    async deleteUser(uid) {
        return await this.dao.deleteUser(uid);
    }
}