import { ProviderNames } from "../../lib/constant/ProviderNames";
import { TicketService } from "../../service/ticket-service/TicketService";
import { SessionService } from "../../service/session-service/SessionService";
import { MovieService } from "../../service/movie-service/MovieService";
import { UserService } from "../../service/user-service/UserService";
import { WatchMovieService } from "../../service/watch-movie-service/WatchMovieService";
import { DataSource, Repository } from "typeorm";
import { WatchedUserMovies } from "../../model/WatchedUserMovies";

export const watchProviders = [

  {
    provide: ProviderNames.WATCH_MOVIE_REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(WatchedUserMovies);
    },
    inject: [ProviderNames.POSTGRES_DATABASE]
  },
  {
    provide: ProviderNames.WATCH_MOVIE_SERVICE,
    useFactory: (ticketService: TicketService, sessionService: SessionService, movieService: MovieService, userService: UserService, watchMovieRepository: Repository<WatchedUserMovies>) => {
      return new WatchMovieService(ticketService, sessionService, movieService, userService, watchMovieRepository);
    },
    inject: [ProviderNames.TICKET_SERVICE, ProviderNames.SESSION_SERVICE, ProviderNames.MOVIE_SERVICE, ProviderNames.USER_SERVICE, ProviderNames.WATCH_MOVIE_REPOSITORY]
  }
];