import ticketModel from "../models/ticket.model.js";

export default class ticketManager {
  getTickets = (params) => {
    return ticketModel.find(params).lean();
  };
  getTicketsById = (params) => {
    return ticketModel.findOne(params).lean();
  };

  createTicket = (ticket) => {
    return ticketModel.create(ticket);
  };

  updateTicket = (id, ticket) => {
    return ticketModel.updateOne({ _id: id }, { $set: ticket });
  };

  deleteTicket = (id) => {
    return ticketModel.deleteOne({ _id: id });
  };
}