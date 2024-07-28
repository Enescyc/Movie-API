import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProviderNames } from "../lib/constant/ProviderNames";
import { RoleGuard } from "../config/guards/RoleGuard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "../config/guards/AuthGuard";
import { CreateMovieDto } from "../dto/movie/CreateMovieDto";
import { UpdateMovieDto } from "../dto/movie/UpdateMovieDto";
import { USER_ROLE } from "../lib/domain/UserDomain";
import { Roles } from "src/config/decorators/RoleDecorator";
import { IMovieService } from "../service/movie-service/IMovieService";

@Controller("/movies")
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
export class MovieController {
  constructor(
    @Inject(ProviderNames.MOVIE_SERVICE) private readonly movieService: IMovieService
  ) {
  }

  @Get()
  async getAllMovies() {
    return await this.movieService.getAllMovies();
  }

  @Get(":id")
  async getMovieById(@Param("id") id: string) {
    return await this.movieService.getMovieById(Number(id));
  }

  @Post()
  @Roles(USER_ROLE.MANAGER)
  async createMovie(@Body() createDto: CreateMovieDto) {
    return await this.movieService.createMovie(createDto);
  }

  @Put(":id")
  @Roles(USER_ROLE.MANAGER)
  async updateMovie(@Body() updateDto: UpdateMovieDto) {
    return await this.movieService.updateMovie(updateDto);
  }

  @Delete(":id")
  @Roles(USER_ROLE.MANAGER)
  async deleteMovie(@Param("id") id: string) {
    return await this.movieService.deleteMovie(Number(id));
  }
}