import { Body, Controller, HttpCode, Inject, Post } from "@nestjs/common";
import { CreateUserDto } from "../dto/user/CreateUserDto";
import { UserLoginDto } from "../dto/user/UserLoginDto";
import { IAuthService } from "../service/auth-service/IAuthService";
import { AuthService } from "../service/auth-service/AuthService";

@Controller("/auth")
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: IAuthService) {
  }

  @Post("login")
  async login(@Body() loginDto: UserLoginDto): Promise<any> {
    return await this.authService.login(loginDto);
  }

  @Post("register")
  @HttpCode(204)
  async register(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.authService.register(createUserDto);
  }

  @Post("register/admin")
  @HttpCode(204)
  async registerAdmin(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.authService.registerAdmin(createUserDto);
  }

  @Post("logout")
  @HttpCode(204)
  async logout(@Body() token: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}