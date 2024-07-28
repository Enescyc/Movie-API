import { Module } from "@nestjs/common";
import { ticketProviders } from "../config/providers/TicketProviders";
import { DatabaseModule } from "./DatabaseModule";
import { TicketController } from "../controller/TicketController";
import { UserModule } from "./UserModule";
import { MovieModule } from "./MovieModule";

@Module({
  imports: [DatabaseModule,UserModule,MovieModule],
  providers: [...ticketProviders],
  exports: [...ticketProviders],
  controllers:[TicketController],
})
export class TicketModule{}