import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";

import { SignUpDto, SignInDto } from "./dto";
import { AuthService } from "./auth.service";
import { JwtGuard } from "@/jwt/jwt.guard";
import { DecodedJwtUser } from "@/jwt/jwt.types";
import { DecodedJwtAccessToken } from "@/jwt/jwt.decorators";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(JwtGuard)
    @Get("me")
    me(@DecodedJwtAccessToken() user: DecodedJwtUser) {
        return this.authService.verifyAccessToken({
            id: user.id,
            role: user.role,
        });
    }

    @Post("sign-in")
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn({
            email: signInDto.email,
            password: signInDto.password,
        });
    }

    @Post("sign-up")
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp({
            name: signUpDto.name,
            email: signUpDto.email,
            password: signUpDto.password,
        });
    }
}
