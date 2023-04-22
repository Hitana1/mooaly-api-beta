import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";

import { JwtGuard } from "@/jwt/jwt.guard";
import { DecodedJwtUser } from "@/jwt/jwt.types";
import { DecodedJwtAccessToken } from "@/jwt/jwt.decorators";
import { UsersService } from "@/users/users.service";
import { ChangePasswordDto, ChangeNameDto, RecoverPasswordDto, ResetPasswordDto } from "./dto";
import { MailerService } from "@/mailer/mailer.service";
import { generateString } from "@/utils/lib";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly mailerService: MailerService) {}

    @UseGuards(JwtGuard)
    @Get("details")
    getUserDetails(@DecodedJwtAccessToken() user: DecodedJwtUser) {
        return this.usersService.findPublicDataById({
            id: user.id,
        });
    }

    @Post("password/recovery")
    async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
        const code = generateString(7);
        // Send code
        await this.mailerService.sendPasswordRecoveryCode({
            to: recoverPasswordDto.email,
            code,
        });
        // Save code
        await this.usersService.findByEmailAndSetPasswordResetCode({
            email: recoverPasswordDto.email,
            passwordResetCode: code,
        });
    }

    @Post("password/reset")
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        await this.usersService.findByEmailAndResetPassword({
            email: resetPasswordDto.email,
            newPassword: resetPasswordDto.newPassword,
            resetCode: resetPasswordDto.resetCode,
        });
    }

    @UseGuards(JwtGuard)
    @Put("name")
    changeName(@Body() changeNameDto: ChangeNameDto, @DecodedJwtAccessToken() user: DecodedJwtUser) {
        return this.usersService.findByIdAndChangeName({
            id: user.id,
            newName: changeNameDto.newName,
        });
    }

    @UseGuards(JwtGuard)
    @Put("password")
    changePassword(@Body() changePasswordDto: ChangePasswordDto, @DecodedJwtAccessToken() user: DecodedJwtUser) {
        return this.usersService.findByIdAndChangePassword({
            id: user.id,
            currentPassword: changePasswordDto.currentPassword,
            newPassword: changePasswordDto.newPassword,
        });
    }
}
