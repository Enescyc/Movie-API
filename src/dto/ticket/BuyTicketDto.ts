import { ApiProperty } from "@nestjs/swagger";

export class BuyTicketDto {
  @ApiProperty({
    example: "admin",
    description: "The username of the user buying the ticket"
  })
  username: string;
  @ApiProperty({
    example: 1,
    description: "The id of the movie the ticket is for"
  })
  movieId: number;
  @ApiProperty({
    example: 1,
    description: "The price of the ticket"
  })
  ticketPrice: number;
  @ApiProperty({
    example: new Date().valueOf(),
    description: "The date of the ticket in milliseconds since epoch"
  })
  ticketDate: number;
  @ApiProperty({
    example: "12:00",
    description: "The time of the session the ticket is for in HH:mm format"
  })
  sessionTime: string;
  @ApiProperty({
    example: 1,
    description: "The number of the seat the ticket is for"
  })
  seatNumber: number;
}