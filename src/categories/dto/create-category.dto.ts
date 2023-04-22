import { IsString, MaxLength, IsNotEmpty } from "class-validator";
import { ICreateCategoryDto } from "@amatinya/mooaly-common-beta";

export class CreateCategoryDto implements ICreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    readonly name: string;
}
