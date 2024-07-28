import { Controller, Get, Inject, Param, UseGuards } from "@nestjs/common";
import { ProviderNames } from "../lib/constant/ProviderNames";
import { IUserService } from "../service/user-service/IUserService";
import { User } from "../model/User";
import { AuthGuard } from "../config/guards/AuthGuard";
import { RoleGuard } from "../config/guards/RoleGuard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("/user")
@UseGuards(AuthGuard, RoleGuard)
@ApiBearerAuth()
export class UserController {
  private readonly userService: IUserService;

  constructor(@Inject(ProviderNames.USER_SERVICE) userService: IUserService) {
    this.userService = userService;
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get("/tickets")
  async getAllTicketsByUserId(@Param("userId")userId: number): Promise<User> {
    return await this.userService.getAllTicketsByUserId(userId);
  }
}