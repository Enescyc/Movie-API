import { Inject, NotFoundException } from "@nestjs/common";
import { ProviderNames } from "../../lib/constant/ProviderNames";
import { Repository } from "typeorm";
import { Movie } from "../../model/Movie";
import { IMovieService } from "./IMovieService";
import { CreateMovieDto } from "src/dto/movie/CreateMovieDto";
import { UpdateMovieDto } from "src/dto/movie/UpdateMovieDto";

export class MovieService implements IMovieService {
  constructor(@Inject(ProviderNames.MOVIE_REPOSITORY) private readonly movieRepository: Repository<Movie>) {
  }

  public async getAllMovies(): Promise<Movie[]> {
    const movies = await this.movieRepository.find({});
    return movies || [];
  }

  public async getMovieById(id: number): Promise<Movie | undefined> {
    return await this.movieRepository.findOne(
      {
        where: { id }
      }
    );
  }

  public async findMovieById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie not found ${id}`);
    }
    return movie;
  }

  public async createMovie(dto: CreateMovieDto): Promise<Movie> {
    try {
      const movie = new Movie();
      movie.name = dto.name;
      movie.ageRestriction = dto.ageRestriction;
      movie.createdAt = new Date().valueOf();
      movie.updatedAt = new Date().valueOf();
      return await this.movieRepository.save(movie);
    } catch (e){
      console.log(e);
    }
  }

  public async updateMovie(dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findMovieById(dto.id);
    movie.name = dto.name;
    movie.ageRestriction = dto.ageRestriction;
    movie.updatedAt = new Date().valueOf();
    return await this.movieRepository.save(movie);

  }

  public async deleteMovie(id: number): Promise<Movie> {
    const movie = await this.findMovieById(id);
    return await this.movieRepository.remove(movie);
  }

}