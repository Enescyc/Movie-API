import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
  @ApiProperty({
    example: "Fight Club",
    description: "The name of the movie"
  })
  name: string;
  @ApiProperty({
    example: 1999,
    description: "The year the movie was released"
  })
  ageRestriction: number;

}