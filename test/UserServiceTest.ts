import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { UserService } from "../src/service/user-service/UserService";
import { User } from "../src/model/User";
import { ProviderNames } from "../src/lib/constant/ProviderNames";

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: ProviderNames.USER_REPOSITORY,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(ProviderNames.USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTicketsByUserId', () => {
    it('should return a user with tickets and movies', async () => {
      const user = { id: 1, tickets: [], movies: [] } as User;
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(await service.getAllTicketsByUserId(1)).toEqual(user);
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const users = [{ id: 1 }, { id: 2 }] as User[];
      jest.spyOn(repository, 'find').mockResolvedValue(users);

      expect(await service.getAll()).toEqual(users);
    });
  });

  describe('getByUserName', () => {
    it('should return a user by username', async () => {
      const user = { username: 'test' } as User;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      expect(await service.getByUserName('test')).toEqual(user);
    });
  });

  describe('findByUsername', () => {
    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);

      await expect(service.findByUsername('te222st')).rejects.toThrow(NotFoundException);
    });

    it('should return a user if found', async () => {
      const user = { username: 'test' } as User;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      expect(await service.findByUsername('test')).toEqual(user);
    });
  });
});
