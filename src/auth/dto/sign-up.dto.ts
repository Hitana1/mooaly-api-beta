import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ISignUpDto } from "@amatinya/mooaly-common-beta";

export class SignUpDto implements ISignUpDto {
    @IsNotEmpty({ message: "sign-up.server-errors.empty-name" })
    @IsString({ message: "sign-up.server-errors.name-is-not-string" })
    @MinLength(2, { message: "sign-up.server-errors.short-name" })
    @MaxLength(120, { message: "sign-up.server-errors.long-name" })
    readonly name: string;

    @IsNotEmpty({ message: "sign-up.server-errors.empty-email" })
    @IsEmail({}, { message: "sign-up.server-errors.invalid-email" })
    readonly email: string;

    @IsNotEmpty({ message: "sign-up.server-errors.empty-password" })
    @IsString({ message: "sign-up.server-errors.password-is-not-string" })
    @MinLength(6, { message: "sign-up.server-errors.short-password" })
    @MaxLength(120, { message: "sign-up.server-errors.long-password" })
    readonly password: string;
}
