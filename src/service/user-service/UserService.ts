import { Inject, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../../model/User";
import { ProviderNames } from "../../lib/constant/ProviderNames";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { IUserService } from "./IUserService";
import { USER_ROLE } from "../../lib/domain/UserDomain";
import { UserAlreadyExistException } from "../../exception/UserAlreadyExistException";

export class UserService implements IUserService {
  constructor(@Inject(ProviderNames.USER_REPOSITORY) private readonly userRepository: Repository<User>) {
  }

  public async getAllTicketsByUserId(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ["tickets", "movies"]
    });
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getByUserName(username: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ username: username });
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      username: username
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const userIsExist = await this.userRepository.existsBy({
      username: createUserDto.username
    });
    if (userIsExist) {
      throw new UserAlreadyExistException(createUserDto.username);
    }

    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password; // TODO HASH
    user.age = createUserDto.age;
    user.createdAt = new Date().valueOf();
    user.updatedAt = new Date().valueOf();
    user.role = USER_ROLE.CUSTOMER;
    return this.userRepository.save(user);
  }

  public async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password; // TODO HASH
    user.age = createUserDto.age;
    user.createdAt = new Date().valueOf();
    user.updatedAt = new Date().valueOf();
    user.role = USER_ROLE.MANAGER;
    return this.userRepository.save(user);
  }
}