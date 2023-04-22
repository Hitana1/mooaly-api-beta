import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ISignInDto } from "@amatinya/mooaly-common-beta";

export class SignInDto implements ISignInDto {
    @IsNotEmpty({ message: "sign-in.server-errors.empty-email" })
    @IsEmail({}, { message: "sign-in.server-errors.invalid-email" })
    readonly email: string;

    @IsNotEmpty({ message: "sign-in.server-errors.empty-password" })
    @IsString({ message: "sign-in.server-errors.password-is-not-string" })
    @MinLength(6, { message: "sign-in.server-errors.short-password" })
    @MaxLength(120, { message: "sign-in.server-errors.long-password" })
    readonly password: string;
}
