import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Session } from "./Session";

@Entity()
export class Ticket extends BaseEntity {
  @ManyToOne(() => User, (user) => user.tickets, { eager: false })
  @JoinColumn({ name: "userId" })
  user: User;
  @Column()
  userId: number;

  @ManyToOne(() => Session, (session) => session.tickets, { eager: true })
  @JoinColumn({ name: "sessionId" })
  session: Session;
  @Column()
  sessionId: number;

  @Column({ type: "bigint" })
  ticketPrice: number;
  @Column({ type: "bigint" })
  ticketDate: number;
  @Column()
  seatNumber: number;
}
