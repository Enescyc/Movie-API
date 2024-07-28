import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Username",
    example: "admin"
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Username",
    example: "admin"
  })
  password: string;
}