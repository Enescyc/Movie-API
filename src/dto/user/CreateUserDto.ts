import { USER_ROLE } from "../../lib/domain/UserDomain";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
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
    description: "Password",
    example: "admin"
  })
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "Age",
    example: 24
  })
  age: number;

  @ApiProperty({
    description: "Role",
    example: "MANAGER"
  })
  @IsEnum(USER_ROLE)
  role: USER_ROLE;
}