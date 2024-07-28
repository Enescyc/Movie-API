import { Movie } from "../../model/Movie";
import { CreateMovieDto } from "../../dto/movie/CreateMovieDto";
import { UpdateMovieDto } from "../../dto/movie/UpdateMovieDto";

export interface IMovieService {
  getAllMovies(): Promise<Movie[]>;
  getMovieById(id: number): Promise<Movie | undefined>;
  createMovie(dto: CreateMovieDto): Promise<Movie>;
  updateMovie(dto: UpdateMovieDto): Promise<Movie>;
  deleteMovie(id: number): Promise<Movie>;
}