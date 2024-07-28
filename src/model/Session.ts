import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Movie } from "./Movie";
import { BaseEntity } from "./BaseEntity";
import { Ticket } from "./Ticket";

@Entity()
export class Session extends BaseEntity {
  @Column()
  sessionDate: number;

  @Column()
  timeSlot: string; // e.g., "10.00-12.00"

  @Column()
  roomNumber: number;

  @ManyToOne(() => Movie, (movie) => movie.sessions, {})
  @JoinColumn({ name: "movieId" })
  movie: Movie;
  @Column()
  movieId: number;

  @OneToMany(() => Ticket, (ticket) => ticket.session)
  tickets: Ticket[];
}
