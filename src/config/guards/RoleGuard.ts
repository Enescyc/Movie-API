import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/RoleDecorator";
import { USER_ROLE } from "../../lib/domain/UserDomain";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<USER_ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const roleIsValid = requiredRoles.some((role) => role == user.sub.role);

    if (!roleIsValid) {
      throw new UnauthorizedException("Unauthorized");
    }
    return roleIsValid;
  }
}