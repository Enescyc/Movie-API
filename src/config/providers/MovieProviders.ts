import { ProviderNames } from "../../lib/constant/ProviderNames";
import { DataSource, Repository } from "typeorm";
import { Movie } from "../../model/Movie";
import { MovieService } from "../../service/movie-service/MovieService";

export const movieProviders = [
  {
    provide: ProviderNames.MOVIE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Movie),
    inject: [ProviderNames.POSTGRES_DATABASE]
  },
  {
    provide: ProviderNames.MOVIE_SERVICE,
    useFactory: (movieRepository: Repository<Movie>) => new MovieService(movieRepository),
    inject: [ProviderNames.MOVIE_REPOSITORY]
  }
];