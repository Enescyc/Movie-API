import { UserLoginDto } from "../../dto/user/UserLoginDto";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { User } from "../../model/User";

export interface IAuthService {
  login(loginDto: UserLoginDto): Promise<{ access_token: string }>;
  register(registerDto: CreateUserDto): Promise<User>;
  verifyToken(accessToken: string): Promise<any>;
  registerAdmin(createUserDto: CreateUserDto): Promise<User>;
}