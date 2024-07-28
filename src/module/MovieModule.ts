import { Module } from "@nestjs/common";
import { movieProviders } from "../config/providers/MovieProviders";
import { DatabaseModule } from "./DatabaseModule";
import { MovieController } from "../controller/MovieController";
import { UserModule } from "./UserModule";

@Module({
  imports: [DatabaseModule, MovieModule, UserModule],
  providers: [...movieProviders],
  exports: [...movieProviders],
  controllers: [MovieController]
})
export class MovieModule {
}

