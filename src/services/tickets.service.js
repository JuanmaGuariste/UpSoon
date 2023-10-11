import TicketsRepository from "../repositories/tickets.repository.js";
import ticketDAO from "../dao/mongo/TicketDAO.js";

const ticketsService = new TicketsRepository(ticketDAO);

export default ticketsService