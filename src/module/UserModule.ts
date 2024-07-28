import { Module } from "@nestjs/common";
import { DatabaseModule } from "./DatabaseModule";
import { userProviders } from "../config/providers/UserProviders";
import { UserController } from "../controller/UserController";
import { ProviderNames } from "../lib/constant/ProviderNames";

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders],
  controllers: [UserController],
  exports: [ProviderNames.USER_SERVICE]
})
export class UserModule {
}