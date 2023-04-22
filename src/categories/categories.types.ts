import { ICreateCategoryDto, IEditCategoryDto } from "@amatinya/mooaly-common-beta";

import { User } from "@/users/user.entity";
import { Category } from "@/categories/category.entity";

// Service
export interface ICategoriesService {
    createOne(details: CreateOneDetails): Promise<void>;
    deleteOne(details: DeleteOneDetails): Promise<void>;
    getOne(details: GetOneDetails): Promise<Pick<Category, "id" | "name">>;
    getAll(details: GetAllDetails): Promise<Category[]>;
    editOne(details: EditOneDetails): Promise<void>;
}

// Service functions details
export type CreateOneDetails = Readonly<
    ICreateCategoryDto & {
        user: User;
    }
>;
export type DeleteOneDetails = Readonly<{
    categoryId: Category["id"];
    userId: User["id"];
}>;
export type GetOneDetails = Readonly<{
    categoryId: Category["id"];
    userId: User["id"];
}>;
export type GetAllDetails = Readonly<{
    userId: User["id"];
}>;
export type EditOneDetails = Readonly<
    IEditCategoryDto & {
        categoryId: Category["id"];
        userId: User["id"];
    }
>;
