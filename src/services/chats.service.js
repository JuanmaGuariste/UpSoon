import ChatsRepository from "../repositories/chats.repository.js";
import chatDAO from "../dao/mongo/ChatDAO.js";

const chatsService = new ChatsRepository(chatDAO);

export default chatsService