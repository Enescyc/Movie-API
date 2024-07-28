import { NestFactory } from "@nestjs/core";
import { AppModule } from "./module/AppModule";
import "reflect-metadata";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./config/exception-filters/HttpExceptionFilter";
import { GlobalExceptionFilter } from "./config/exception-filters/GlobalExceptionFilter";
import { USER_ROLE } from "./lib/domain/UserDomain";
import { ProviderNames } from "./lib/constant/ProviderNames";
import { IUserService } from "./service/user-service/IUserService";
import { CreateUserDto } from "./dto/user/CreateUserDto";
import { CreateMovieDto } from "./dto/movie/CreateMovieDto";
import { CreateTicketDto } from "./dto/ticket/CreateTicketDto";
import { CreateSessionDto } from "./dto/session/CreateSessionDto";
import { TimeSlot } from "./lib/domain/SessionDomain";
import { IMovieService } from "./service/movie-service/IMovieService";
import { ISessionService } from "./service/session-service/ISessionService";
import { ITicketService } from "./service/ticket-service/ITicketService";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder().addBearerAuth()
    .setExternalDoc("Postman Collection", "/api-json")
    .setTitle("Movie API")
    .setContact("Enes Sahin", "http://www.github.com/enescyc", "menesahin99@gmail.com")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {});

  await app.listen(3000);
  await integrateApp(app);
}

async function integrateApp(app: INestApplication) {
  try {
    const defaultUsers: CreateUserDto[] = [
      {
        username: "manager",
        password: "manager",
        age: 24,
        role: USER_ROLE.MANAGER
      },
      {
        username: "customer",
        password: "customer",
        age: 24,
        role: USER_ROLE.MANAGER
      }
    ];
    const userService: IUserService = await app.resolve(ProviderNames.USER_SERVICE);
    await userService.createAdmin(defaultUsers[0]);
    await userService.create(defaultUsers[1]);

    const movies: CreateMovieDto[] = [
      {
        name: "The Shawshank Redemption",
        ageRestriction: 18
      },
      {
        name: "The Godfather",
        ageRestriction: 18
      },
      {
        name: "The Dark Knight",
        ageRestriction: 18
      },
      {
        name: "12 Angry",
        ageRestriction: 18
      },
      {
        name: "Schindler's List",
        ageRestriction: 18
      },
      {
        name: "The Lord of the Rings: The Return of the King",
        ageRestriction: 18
      },
      {
        name: "Pulp Fiction",
        ageRestriction: 18
      },
      {
        name: "The Lord of the Rings: The Fellowship of the Ring",
        ageRestriction: 18
      },
      {
        name: "Forrest Gump",
        ageRestriction: 18
      },
      {
        name: "Fight Club",
        ageRestriction: 18
      }
    ];
    const sessionService: ISessionService = await app.resolve(ProviderNames.SESSION_SERVICE);
    const movieService: IMovieService = await app.resolve(ProviderNames.MOVIE_SERVICE);
    for (const movie of movies) {
      const newMovie = await movieService.createMovie(movie);
      const sessions: CreateSessionDto[] = [
        {
          date: 1612137600,
          timeSlot: TimeSlot.AFTERNOON_2,
          movieId: newMovie.id,
          roomNumber: 1
        },
        {
          date: 1612137600,
          timeSlot: TimeSlot.AFTERNOON,
          movieId: newMovie.id,
          roomNumber: 2
        }
      ];
      for (const session of sessions) {
        await sessionService.createSession(session);
        console.info(`Session created for movie ${movie.name}`);
      }
    }

    const ticketService: ITicketService = await app.resolve(ProviderNames.TICKET_SERVICE);
    const tickets: CreateTicketDto[] = [
      {
        sessionId: 1,
        seatNumber: 1,
        userId: 1,
        ticketPrice: 10,
        ticketDate: new Date().valueOf()
      },
      {
        sessionId: 2,
        seatNumber: 2,
        userId: 2,
        ticketPrice: 10,
        ticketDate: new Date().valueOf()
      }
    ];
    for (const ticket of tickets) {
      await ticketService.createTicket(ticket);
      console.info(`Ticket created for session ${ticket.sessionId}`);
    }
  } catch (e) {
    console.error("Error while integrating app ",e);
  }
}

bootstrap();
