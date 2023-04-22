import { IsString, Length } from "class-validator";
import { IChangeUserNameDto } from "@amatinya/mooaly-common-beta";

export class ChangeNameDto implements IChangeUserNameDto {
    @IsString()
    @Length(2, 120)
    readonly newName: string;
}
