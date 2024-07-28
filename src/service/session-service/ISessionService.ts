import { CreateSessionDto } from "../../dto/session/CreateSessionDto";
import { Session } from "../../model/Session";
import { UpdateSessionDto } from "../../dto/session/UpdateSessionDto";

export interface ISessionService {
  createSession(sessionDto: CreateSessionDto): Promise<Session>;
  deleteSessionById(sessionId: number): Promise<void>;
  getSessionById(sessionId: number): Promise<Session>;
  getSessions(): Promise<Session[]>;
  updateSession(updateSessionDto: UpdateSessionDto): Promise<Session>;
}