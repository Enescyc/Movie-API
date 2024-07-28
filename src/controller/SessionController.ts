import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProviderNames } from "../lib/constant/ProviderNames";
import { Session } from "../model/Session";
import { ISessionService } from "../service/session-service/ISessionService";
import { CreateSessionDto } from "../dto/session/CreateSessionDto";
import { UpdateSessionDto } from "../dto/session/UpdateSessionDto";
import { AuthGuard } from "../config/guards/AuthGuard";
import { RoleGuard } from "../config/guards/RoleGuard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("/session")
@UseGuards(AuthGuard, RoleGuard)
@ApiBearerAuth()
export class SessionController {

  constructor(@Inject(ProviderNames.SESSION_SERVICE) private readonly sessionService: ISessionService) {
  }

  @Get()
  async getAllSessions(): Promise<Session[]> {
    return this.sessionService.getSessions();
  }

  @Get("/:id")
  async getSessionById(@Param("id") id: number): Promise<Session> {
    return this.sessionService.getSessionById(id);
  }

  @Post()
  async createSession(@Body() sessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionService.createSession(sessionDto);
  }

  @Put("")
  async updateSession(@Body() sessionDto: UpdateSessionDto): Promise<Session> {
    return this.sessionService.updateSession(sessionDto);
  }

  @Delete("/:id")
  async deleteSession(@Param("id") id: number): Promise<void> {
    return this.sessionService.deleteSessionById(id);
  }
}