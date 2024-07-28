import { Module } from "@nestjs/common";
import { DatabaseModule } from "./DatabaseModule";
import { SessionController } from "../controller/SessionController";
import { sessionProviders } from "../config/providers/SessionProviders";

@Module({
  imports: [DatabaseModule],
  providers: [...sessionProviders],
  exports: [...sessionProviders],
  controllers: [SessionController]
})
export class SessionModule {
}