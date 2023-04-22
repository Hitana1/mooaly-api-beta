import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
    CreateOneDetails,
    DeleteOneDetails,
    GetAllDetails,
    GetOneDetails,
    ICategoriesService,
    EditOneDetails,
} from "./categories.types";
import { Category } from "./category.entity";

@Injectable()
export class CategoriesService implements ICategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async createOne(details: CreateOneDetails): Promise<void> {
        // Remove timezone
        const dateCreated = new Date();
        dateCreated.setHours(dateCreated.getHours() - dateCreated.getTimezoneOffset());
        // Create a category
        const newCategory = this.categoryRepository.create({
            name: details.name,
            user: details.user,
            dateCreated,
        });
        // Save
        await this.categoryRepository.save(newCategory);
    }

    async deleteOne(details: DeleteOneDetails): Promise<void> {
        await this.categoryRepository
            .createQueryBuilder("c")
            .delete()
            .where("id=:categoryId and userId=:userId", { categoryId: details.categoryId, userId: details.userId })
            .execute();
    }

    async getOne(details: GetOneDetails): Promise<Category> {
        const category = await this.categoryRepository
            .createQueryBuilder("c")
            .where("c.id = :categoryId and c.userId=:userId", {
                categoryId: details.categoryId,
                userId: details.userId,
            })
            .select(["c.name", "c.id"])
            .getOne();
        if (category === null) {
            throw new NotFoundException("Category is not found");
        }
        return category;
    }

    getAll(details: GetAllDetails): Promise<Category[]> {
        return this.categoryRepository
            .createQueryBuilder("c")
            .where("c.userId=:userId", {
                userId: details.userId,
            })
            .select(["c.name", "c.id"])
            .getMany();
    }

    async editOne(details: EditOneDetails): Promise<void> {
        const category = await this.categoryRepository
            .createQueryBuilder("c")
            .where("c.id = :categoryId and c.userId=:userId", {
                categoryId: details.categoryId,
                userId: details.userId,
            })
            .select(["c.name", "c.id"])
            .getOne();
        if (category === null) {
            throw new NotFoundException("Category is not found");
        }
        category.name = details.name;
        await this.categoryRepository.save(category);
    }
}
