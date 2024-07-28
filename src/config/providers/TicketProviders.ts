import { DataSource, Repository } from "typeorm";
import { Ticket } from "../../model/Ticket";
import { ProviderNames } from "../../lib/constant/ProviderNames";
import { TicketService } from "../../service/ticket-service/TicketService";
import { UserService } from "../../service/user-service/UserService";
import { MovieService } from "../../service/movie-service/MovieService";

export const ticketProviders = [
  {
    provide: ProviderNames.TICKET_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ticket),
    inject: [ProviderNames.POSTGRES_DATABASE]
  },
  {
    provide: ProviderNames.TICKET_SERVICE,
    useFactory: (ticketRepository: Repository<Ticket>,userService : UserService,movieService:MovieService) => {
      return new TicketService(ticketRepository,userService,movieService);
    },
    inject: [ProviderNames.TICKET_REPOSITORY,ProviderNames.USER_SERVICE,ProviderNames.MOVIE_SERVICE]
  }

];