import { IsEnum, IsNumber } from "class-validator";
import { TimeSlot } from "../../lib/domain/SessionDomain";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionDto {
  @IsNumber()
  @ApiProperty({
    description: "Unix timestamp",
    example: 1612137600
  })
  date: number;

  @IsEnum(TimeSlot)
  @ApiProperty({
    description: "16.00-18.00",
    example: TimeSlot.EVENING
  })
  timeSlot: string;

  @IsNumber()
  @ApiProperty({
    description: "Room number",
    example: 1
  })
  roomNumber: number;

  @IsNumber()
  @ApiProperty({
    description: "Movie ID",
    example: 1
  })
  movieId: number;
}