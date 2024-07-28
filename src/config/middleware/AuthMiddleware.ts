import { Inject, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../../service/auth-service/AuthService";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(@Inject(AuthService) private readonly authService: AuthService) {
  }

  async use(req: Request, res: Response, next: Function) {
    const { authorization } = req.headers as any;
    console.log(authorization,"middleware");
    if (!authorization) {
      throw new UnauthorizedException("Unauthorized");
    }
    const token = authorization.split(" ")[1];
    const user = await this.authService.verifyToken(token);
    req["user"] = user.sub;
    next();
  }
}