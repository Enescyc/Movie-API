import { DataSource, Repository } from "typeorm";
import { User } from "../../model/User";
import { ProviderNames } from "../../lib/constant/ProviderNames";
import { UserService } from "../../service/user-service/UserService";

export const userProviders = [
  {
    provide: ProviderNames.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [ProviderNames.POSTGRES_DATABASE]
  },
  {
    provide: ProviderNames.USER_SERVICE,
    useFactory: (userRepository : Repository<User>) => new UserService(userRepository),
    inject: [ProviderNames.USER_REPOSITORY]
  }
];