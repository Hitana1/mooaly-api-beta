import { IsString, MaxLength, IsNotEmpty } from "class-validator";
import { IEditCategoryDto } from "@amatinya/mooaly-common-beta";

export class EditCategoryDto implements IEditCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    readonly name: string;
}
