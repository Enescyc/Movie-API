import { ProviderNames } from "../../lib/constant/ProviderNames";
import { DataSource, Repository } from "typeorm";
import { Session } from "../../model/Session";
import { SessionService } from "../../service/session-service/SessionService";

export const sessionProviders = [
  {
    provide: ProviderNames.SESSION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Session),
    inject: [ProviderNames.POSTGRES_DATABASE]
  },
  {
    provide: ProviderNames.SESSION_SERVICE,
    useFactory: (sessionRepository: Repository<Session>) => new SessionService(sessionRepository),
    inject: [ProviderNames.SESSION_REPOSITORY]
  }
];