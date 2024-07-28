import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "The session id"

  })
  sessionId: number;
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "The user id"

  })
  userId: number;
  @ApiProperty({
    example: new Date().valueOf(),
    description: "The date of the ticket"
  })
  @IsNumber()
  ticketDate: number;
  @IsNumber()
  @ApiProperty({
    example: 10,
    description: "The price of the ticket"
  })
  ticketPrice: number;
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "The seat number"
  })
  seatNumber: number;

}