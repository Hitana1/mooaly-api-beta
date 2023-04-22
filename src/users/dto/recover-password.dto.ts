import { IUserPasswordRecoveryDto } from "@amatinya/mooaly-common-beta";
import { IsEmail, IsNotEmpty } from "class-validator";

export class RecoverPasswordDto implements IUserPasswordRecoveryDto {
    @IsNotEmpty({ message: "password-recovery.server-errors.password-recovery.empty-email" })
    @IsEmail({}, { message: "password-recovery.server-errors.password-recovery.invalid-email" })
    readonly email: string;
}
