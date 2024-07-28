import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Movie } from "./Movie";

@Entity()
export class WatchedUserMovies extends BaseEntity {

  @ManyToOne(() => User, (user) => user.movies)
  public user: User;
  @Column()
  public userId: number;

  @ManyToOne(() => Movie, (movie) => movie.users)
  public movie: Movie;
  @Column()
  public movieId: number;

  @Column()
  public rate: number;
  @Column()
  public review: string;
}