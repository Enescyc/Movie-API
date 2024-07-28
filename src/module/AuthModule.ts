import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { AuthService } from "../service/auth-service/AuthService";
import { UserModule } from "./UserModule";
import { AuthController } from "../controller/AuthController";

@Module({
  imports: [UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: "30d" }
    })
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
