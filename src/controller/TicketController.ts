import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProviderNames } from "../lib/constant/ProviderNames";
import { AuthGuard } from "../config/guards/AuthGuard";
import { ITicketService } from "../service/ticket-service/ITicketService";
import { Ticket } from "../model/Ticket";
import { CreateTicketDto } from "../dto/ticket/CreateTicketDto";
import { UpdateTicketDto } from "../dto/ticket/UpdateTicketDto";
import { RoleGuard } from "../config/guards/RoleGuard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("/ticket")
@UseGuards(AuthGuard, RoleGuard)
@ApiBearerAuth()
export class TicketController {

  constructor(@Inject(ProviderNames.TICKET_SERVICE) private readonly ticketService: ITicketService) {
  }

  @Get()
  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketService.getTickets();
  }

  @Get("/:id")
  async getTicketById(@Param("id") id: number): Promise<Ticket> {
    return this.ticketService.getTicketById(id);
  }

  @Post()
  async createTicket(@Body() ticketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.createTicket(ticketDto);
  }

  @Put()
  async updateTicket(@Body() ticketDto: UpdateTicketDto): Promise<Ticket> {
    return this.ticketService.updateTicket(ticketDto);
  }

  @Delete("/:id")
  async deleteTicket(@Param("id") id: number): Promise<void> {
    return this.ticketService.deleteTicketById(id);
  }
}