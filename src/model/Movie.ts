import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Session } from "./Session";
import { WatchedUserMovies } from "./WatchedUserMovies";

@Entity()
export class Movie extends BaseEntity {
  @Column()
  name: string;

  @Column()
  ageRestriction: number;

  @OneToMany(() => Session, (session) => session.movie, { eager: false })
  sessions: Session[];

  @OneToMany(() => WatchedUserMovies, (watchedUserMovies) => watchedUserMovies.movie)
  users: WatchedUserMovies[];
}