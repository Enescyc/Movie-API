import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user-service/UserService";
import * as process from "process";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { UserLoginDto } from "../../dto/user/UserLoginDto";
import { ProviderNames } from "../../lib/constant/ProviderNames";
import { IAuthService } from "./IAuthService";
import { User } from "../../model/User";

@Injectable()
export class AuthService implements IAuthService {

  private readonly userService: UserService;
  private readonly jwtService: JwtService;

  constructor(@Inject(ProviderNames.USER_SERVICE) userService: UserService, @Inject(JwtService) jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  public async login(userLoginDto: UserLoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(userLoginDto.username);
    if (user.password != userLoginDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user, username: user.username };
    const token = await this.jwtService.signAsync(payload, { secret: process.env.SECRET });
    const tokenIsVerified = await this.verifyToken(token);

    if (!tokenIsVerified) throw new UnauthorizedException();
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: process.env.SECRET })
    };
  }

  public async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.getByUserName(createUserDto.username);
    if (user) throw new Error("User already exists");
    return this.userService.create(createUserDto);
  }

  public async registerAdmin(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.getByUserName(createUserDto.username);
    if (user) throw new Error("User already exists");
    return this.userService.createAdmin(createUserDto);

  }

  public async verifyToken(accessToken: string): Promise<any> {
    return await this.jwtService.verifyAsync(accessToken, { secret: process.env.SECRET });
  }
}