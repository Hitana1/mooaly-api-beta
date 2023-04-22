import { IResetUserPasswordDto } from "@amatinya/mooaly-common-beta";
import { IsEmail, MaxLength, MinLength, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto implements IResetUserPasswordDto {
    @IsNotEmpty({ message: "password-recovery.server-errors.password-reset.empty-email" })
    @IsEmail({}, { message: "password-recovery.server-errors.password-reset.invalid-email" })
    readonly email: string;

    @IsNotEmpty({ message: "password-recovery.server-errors.password-reset.empty-new-password" })
    @IsString({ message: "password-recovery.server-errors.password-reset.new-password-is-not-string" })
    @MinLength(6, { message: "password-recovery.server-errors.password-reset.short-new-password" })
    @MaxLength(120, { message: "password-recovery.server-errors.password-reset.long-new-password" })
    readonly newPassword: string;

    @IsString({ message: "password-recovery.server-errors.password-reset.reset-code-is-not-string" })
    @IsNotEmpty({ message: "password-recovery.server-errors.password-reset.reset-code-required" })
    readonly resetCode: string;
}
