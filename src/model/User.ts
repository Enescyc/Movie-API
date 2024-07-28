import { Column, Entity, OneToMany } from "typeorm";
import { USER_ROLE } from "../lib/domain/UserDomain";
import { BaseEntity } from "./BaseEntity";
import { Ticket } from "./Ticket";
import { WatchedUserMovies } from "./WatchedUserMovies";

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  role: USER_ROLE;

  @OneToMany(() => Ticket, (ticket) => ticket.user, { createForeignKeyConstraints: false })
  tickets: Ticket[];

  @OneToMany(() => WatchedUserMovies, (watchedUserMovies) => watchedUserMovies.user)
  movies: WatchedUserMovies[]
}