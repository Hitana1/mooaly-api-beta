import { IsString, Length } from "class-validator";
import { IChangeUserPasswordDto } from "@amatinya/mooaly-common-beta";

export class ChangePasswordDto implements IChangeUserPasswordDto {
    @IsString()
    @Length(6, 120)
    readonly currentPassword: string;

    @IsString()
    @Length(6, 120)
    readonly newPassword: string;
}
