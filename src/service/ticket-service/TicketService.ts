import { Inject } from "@nestjs/common";
import { ProviderNames } from "../../lib/constant/ProviderNames";
import { Repository } from "typeorm";
import { Ticket } from "../../model/Ticket";
import { UserService } from "../user-service/UserService";
import { MovieService } from "../movie-service/MovieService";
import { ITicketService } from "./ITicketService";
import { CreateTicketDto } from "src/dto/ticket/CreateTicketDto";
import { UpdateTicketDto } from "../../dto/ticket/UpdateTicketDto";

export class TicketService implements ITicketService {
  constructor(
    @Inject(ProviderNames.TICKET_REPOSITORY) private readonly ticketRepository: Repository<Ticket>,
    @Inject(ProviderNames.USER_SERVICE) private readonly userService: UserService,
    @Inject(ProviderNames.MOVIE_SERVICE) private readonly movieService: MovieService
  ) {
  }

  public async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = new Ticket();
    ticket.userId = createTicketDto.userId;
    ticket.sessionId = createTicketDto.sessionId;
    ticket.seatNumber = createTicketDto.seatNumber;
    ticket.ticketPrice = createTicketDto.ticketPrice;
    ticket.ticketDate = createTicketDto.ticketDate;
    ticket.createdAt = new Date().valueOf();
    ticket.updatedAt = new Date().valueOf();
    return this.ticketRepository.save(ticket);
  }

  public async getTicketById(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({
      where: { id },
      relations: ["user", "session"]
    });
  }

  public async getTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: ["user", "session"]
    });
  }

  public async updateTicket(updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: updateTicketDto.id }
    });
    ticket.sessionId = updateTicketDto.sessionId;
    ticket.updatedAt = new Date().valueOf();
    return this.ticketRepository.save(ticket);
  }

  public async deleteTicketById(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}