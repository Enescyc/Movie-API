import { Inject, Injectable } from "@nestjs/common";
import { ProviderNames } from "../../lib/constant/ProviderNames";
import { TicketService } from "../ticket-service/TicketService";
import { SessionService } from "../session-service/SessionService";
import { MovieService } from "../movie-service/MovieService";
import { UserService } from "../user-service/UserService";
import { IWatchMovieService } from "./IWatchMovieService";
import { Ticket } from "../../model/Ticket";
import { Session } from "../../model/Session";
import { User } from "../../model/User";
import { Movie } from "../../model/Movie";
import { Repository } from "typeorm";
import { WatchedUserMovies } from "../../model/WatchedUserMovies";

@Injectable()
export class WatchMovieService implements IWatchMovieService {
  constructor(
    @Inject(ProviderNames.TICKET_SERVICE) private readonly ticketService: TicketService,
    @Inject(ProviderNames.SESSION_SERVICE) private readonly sessionService: SessionService,
    @Inject(ProviderNames.MOVIE_SERVICE) private readonly movieService: MovieService,
    @Inject(ProviderNames.USER_SERVICE) private readonly userService: UserService,
    @Inject(ProviderNames.WATCH_MOVIE_REPOSITORY) private readonly watchedUserMoviesRepository: Repository<WatchedUserMovies>
  ) {
  }

  public async watchMovie(ticketId: number) {
    const ticket = await this.ticketService.getTicketById(ticketId);
    const session = ticket.session;
    const user = ticket.user;
    const movie = await this.movieService.getMovieById(session.movieId);
    const ticketIsValidate = await this.validateTicket(ticket, session, user, movie);
    if (!ticketIsValidate) {
      throw new Error(`Ticket is not valid! ${ticketId}`);
    }
    const watchedUserMovies = new WatchedUserMovies();
    watchedUserMovies.createdAt = new Date().valueOf();
    watchedUserMovies.updatedAt = new Date().valueOf();
    watchedUserMovies.user = user
    watchedUserMovies.movie = movie;
    watchedUserMovies.rate = 2;
    watchedUserMovies.review = "This is a good movie!";
    return await this.watchedUserMoviesRepository.save(watchedUserMovies, {});
  }

  private async validateTicket(ticket: Ticket, session: Session, user: User, movie: Movie) {
    const sessionDate = new Date(session.sessionDate);
    const currentDate = new Date();
    return sessionDate.getHours() - currentDate.getHours() >= 1;

  }
}