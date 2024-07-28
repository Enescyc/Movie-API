import { Inject, NotFoundException } from "@nestjs/common";
import { ProviderNames } from "../../lib/constant/ProviderNames";
import { Session } from "../../model/Session";
import { Repository } from "typeorm";
import { ISessionService } from "./ISessionService";
import { CreateSessionDto } from "src/dto/session/CreateSessionDto";
import { UpdateSessionDto } from "src/dto/session/UpdateSessionDto";

export class SessionService implements ISessionService {
  constructor(@Inject(ProviderNames.SESSION_REPOSITORY) private readonly sessionRepository: Repository<Session>) {
  }

  private findSessionById(sessionId: number): Promise<Session> {
    const session = this.sessionRepository.findOne({
      where: { id: sessionId }
    });
    if (!session) {
      throw new NotFoundException(`Session with id ${sessionId} not found`);
    }
    return session;
  }

  public async createSession(sessionDto: CreateSessionDto): Promise<Session> {
    const session = new Session();
    session.createdAt = new Date().valueOf();
    session.updatedAt = new Date().valueOf();
    session.sessionDate = sessionDto.date;
    session.roomNumber = sessionDto.roomNumber;
    session.timeSlot = sessionDto.timeSlot;
    session.movieId = sessionDto.movieId;
    return this.sessionRepository.save(session);
  }

  public async deleteSessionById(sessionId: number): Promise<void> {
    await this.sessionRepository.delete({ id: sessionId });
  }

  public async getSessionById(sessionId: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId }
    });
    return session;
  }

  public async getSessions(): Promise<Session[]> {
    return this.sessionRepository.find();
  }

  public async updateSession(updateSessionDto: UpdateSessionDto): Promise<Session> {
    const session = await this.findSessionById(updateSessionDto.id);
    session.updatedAt = new Date().valueOf();
    session.sessionDate = new Date(updateSessionDto.date).getDate().valueOf();
    session.roomNumber = updateSessionDto.roomNumber;
    session.timeSlot = updateSessionDto.timeSlot;
    session.movieId = updateSessionDto.movieId;
    return this.sessionRepository.save(session);
  }
}