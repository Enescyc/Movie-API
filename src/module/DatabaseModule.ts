import { Module } from "@nestjs/common";
import { databaseProviders } from "../config/providers/DatabaseProviders";

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule {
}
