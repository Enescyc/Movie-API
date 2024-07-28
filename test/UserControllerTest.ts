import { UserController } from "../src/controller/UserController";
import { IUserService } from "../src/service/user-service/IUserService";
import { UserService } from "../src/service/user-service/UserService";
import { DataSource } from "typeorm";
import { User } from "../src/model/User";
import { USER_ROLE } from "../src/lib/domain/UserDomain";

describe("UserController", () => {

  let userController: UserController;
  let userService: IUserService;

  const TestDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "movie"
  });

  beforeEach(() => {
    const userRepository = TestDataSource.getRepository(User);
    userService = new UserService(userRepository);
    userController = new UserController(userService);
  });

  describe("getAllUsers", () => {
    it("should return an array of users", async () => {
      const result: User[] = [{
        id: 1,
        username: "test",
        password: "test",
        age: 20,
        movies: [],
        role: USER_ROLE.MANAGER,
        tickets: [],
        createdAt: 0,
        updatedAt: 0
      }];
      jest.spyOn(userService, "getAll").mockImplementation(async () => result);
      expect(await userController.getAll()).toBe(result);
    });
  });
});