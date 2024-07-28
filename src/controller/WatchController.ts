import { Controller, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { ProviderNames } from "../lib/constant/ProviderNames";
import { IWatchMovieService } from "../service/watch-movie-service/IWatchMovieService";
import { AuthGuard } from "../config/guards/AuthGuard";
import { RoleGuard } from "../config/guards/RoleGuard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("watch")
@UseGuards(AuthGuard, RoleGuard)
@ApiBearerAuth()
export class WatchController {
  constructor(@Inject(ProviderNames.WATCH_MOVIE_SERVICE) private readonly watchMovieService: IWatchMovieService) {
  }

  @Post(":ticketId")
  async watchMovie(@Param("ticketId") ticketId: number) {
    return await this.watchMovieService.watchMovie(ticketId);
  }

}