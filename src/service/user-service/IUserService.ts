import { User } from "../../model/User";
import { CreateUserDto } from "../../dto/user/CreateUserDto";

export interface IUserService {
  findByUsername(username: string): Promise<User>;
  getByUserName(username: string): Promise<User | undefined>;
  getAll(): Promise<User[]>;
  create(createUserDto: CreateUserDto): Promise<User>;
  createAdmin(createUserDto: CreateUserDto): Promise<User>;
  getAllTicketsByUserId(userId: number): Promise<User>;
}