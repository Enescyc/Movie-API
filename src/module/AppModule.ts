import { Module } from "@nestjs/common";
import { DatabaseModule } from "./DatabaseModule";
import { UserModule } from "./UserModule";
import { AuthModule } from "./AuthModule";
import { MovieModule } from "./MovieModule";
import { TicketModule } from "./TicketModule";
import { SessionModule } from "./SessionModule";
import { WatchModule } from "./WatchModule";

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, MovieModule, TicketModule, SessionModule,WatchModule],
  controllers: [],
  providers: []
})
export class AppModule {
}
