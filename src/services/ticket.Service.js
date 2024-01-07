export default class ticketService {
    constructor(dao) {
      this.dao = dao;
    }
    getTickets = (params) => {
      return this.dao.getTickets(params);
    };
  
    getTicketsById = (params) => {
      return this.dao.getTicketsById(params, { populate: true });
    };
    createTicket = (ticket) => {
      return this.dao.createTicket(ticket);
    };
    updateTicket = (id, ticket) => {
      return this.dao.updateTicket(id, ticket);
    };
    deleteTicket = (id) => {
      return this.dao.deleteTicket(id);
    };
  }