import UserRepository from "../repositories/users.repository.js";
import userDAO from "../dao/mongo/UserDAO.js";

const usersService = new UserRepository(userDAO);

export default usersService;

