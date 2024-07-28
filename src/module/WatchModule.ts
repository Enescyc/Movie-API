import { Module } from "@nestjs/common";
import { UserModule } from "./UserModule";
import { TicketModule } from "./TicketModule";
import { SessionModule } from "./SessionModule";
import { watchProviders } from "../config/providers/WatchProviders";
import { WatchController } from "../controller/WatchController";
import { MovieModule } from "./MovieModule";
import { AuthModule } from "./AuthModule";
import { DatabaseModule } from "./DatabaseModule";

@Module({
  imports: [DatabaseModule, TicketModule, SessionModule, MovieModule, UserModule, AuthModule],
  providers: [...watchProviders],
  exports: [...watchProviders],
  controllers: [WatchController]
})
export class WatchModule {

}