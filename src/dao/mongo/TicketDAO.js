import ticketModel from "../models/ticket.model.js";

class TicketDAO {
    constructor() {
        this.model = ticketModel;
    }

    async getTickets() {
        return await this.model.find();
    }

    async getTicketById(tid) {
        return await this.model.findOne({ _id: tid });
    }  

    async getTicketByEmail(email) {
        // return await this.model.findOne({ purchaser: email });
        return await this.model.findOne({ purchaser: email }).populate('products.product').lean();
    }  

    async addTicket(ticket) {        
        return await this.model.create(ticket);
    }
}

const ticketDAO = new TicketDAO();

export default ticketDAO;