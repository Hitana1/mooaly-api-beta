import { Controller, Post, Body, UseGuards, NotFoundException, Delete, Param, Get, Put } from "@nestjs/common";

import { CreateCategoryDto, EditCategoryDto } from "./dto";
import { JwtGuard } from "@/jwt/jwt.guard";
import { DecodedJwtUser } from "@/jwt/jwt.types";
import { DecodedJwtAccessToken } from "@/jwt/jwt.decorators";
import { CategoriesService } from "./categories.service";
import { UsersService } from "@/users/users.service";

@Controller("/categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService, private readonly usersService: UsersService) {}

    @UseGuards(JwtGuard)
    @Get("")
    getAllCategories(@DecodedJwtAccessToken() user: DecodedJwtUser) {
        return this.categoriesService.getAll({
            userId: user.id,
        });
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    getCategoryDetails(@Param("id") id: string, @DecodedJwtAccessToken() user: DecodedJwtUser) {
        return this.categoriesService.getOne({
            categoryId: Number(id),
            userId: user.id,
        });
    }

    @UseGuards(JwtGuard)
    @Post("")
    async createCategory(
        @Body() createCategoryDto: CreateCategoryDto,
        @DecodedJwtAccessToken() jwtUser: DecodedJwtUser,
    ) {
        const user = await this.usersService.findById({ id: jwtUser.id });
        if (user === null) {
            throw new NotFoundException(`User with id=${jwtUser.id} is not found`);
        }
        return this.categoriesService.createOne({
            name: createCategoryDto.name,
            user,
        });
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    deleteCategory(@Param("id") id: string, @DecodedJwtAccessToken() user: DecodedJwtUser) {
        return this.categoriesService.deleteOne({
            categoryId: Number(id),
            userId: user.id,
        });
    }

    @UseGuards(JwtGuard)
    @Put(":id")
    editCategory(
        @Body() editCategoryDto: EditCategoryDto,
        @Param("id") id: string,
        @DecodedJwtAccessToken() user: DecodedJwtUser,
    ) {
        return this.categoriesService.editOne({
            categoryId: Number(id),
            userId: user.id,
            name: editCategoryDto.name,
        });
    }
}
