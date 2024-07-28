import { WatchedUserMovies } from "../../model/WatchedUserMovies";

export interface IWatchMovieService {
    watchMovie(ticketId: number): Promise<WatchedUserMovies>;
}