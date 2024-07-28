import { CreateTicketDto } from "../../dto/ticket/CreateTicketDto";
import { Ticket } from "../../model/Ticket";
import { UpdateTicketDto } from "../../dto/ticket/UpdateTicketDto";

export interface ITicketService {
  createTicket(createTicketDto: CreateTicketDto): Promise<Ticket>;
  getTicketById(id: number): Promise<Ticket>;
  getTickets(): Promise<Ticket[]>;
  updateTicket(updateTicketDto: UpdateTicketDto): Promise<Ticket>;
  deleteTicketById(id: number): Promise<void>;
}