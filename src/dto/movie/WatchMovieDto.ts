import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class WatchMovieDto {
  @ApiProperty(
    {
      description: "The id of the movie to watch",
      example: 1
    }
  )
  @IsNumber()
  ticketId: number;
}