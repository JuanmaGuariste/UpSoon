export default class TicketsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getTickets() {
        return await this.dao.getTickets();
    }

    async getTicketById(tid) {
        return await this.dao.getTicketById(tid);
    }
    async getTicketByEmail(email) {
        return await this.dao.getTicketByEmail(email);
    }

    async addTicket(ticket) {
        return await this.dao.addTicket(ticket);
    }
}