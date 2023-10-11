import chatModel from "../models/chat.model.js";

class ChatDAO {
    constructor() {
        this.model = chatModel;
    }

    async getAllMessages() {
        return await this.model.find().lean();
    }

    async addMessage(chat) {
        return await this.model.create(chat);
    }
}

const chatDAO = new ChatDAO();

export default chatDAO;