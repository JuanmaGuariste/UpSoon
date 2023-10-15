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

    async getAllTicketsByEmail(email) {
        let tickets = await this.dao.getTickets();
        let filteredTickets = [];        
        tickets.forEach(ticket => {
            if (ticket.purchaser == `${email}`){
                filteredTickets.push(ticket)
            }
        });
        return filteredTickets
    }
}