import { DataSource } from "typeorm";
import { User } from "../../model/User";
import { ProviderNames } from "../../lib/constant/ProviderNames";
import { Movie } from "../../model/Movie";
import { Session } from "../../model/Session";
import { Ticket } from "../../model/Ticket";
import { WatchedUserMovies } from "../../model/WatchedUserMovies";
import * as process from "node:process";

export const databaseProviders = [
  {
    provide: ProviderNames.POSTGRES_DATABASE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: process.env.PG_HOST || "localhost",
        port: Number(process.env.PG_PORT) || 5432 as number,
        username: process.env.PG_USERNAME || "root",
        password: process.env.PG_PASSWORD || "root",
        database: process.env.PG_DATABASE || "root",
        entities: [
          User,
          Movie,
          Session,
          Ticket,
          WatchedUserMovies
        ],
        synchronize: true
      });
      return dataSource.initialize().catch((error) => {
        console.error(error);
        process.exit(1);
      });
    }
  }
];