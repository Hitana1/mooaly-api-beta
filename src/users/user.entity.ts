import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserRoles } from "@amatinya/mooaly-common-beta";

import { Category } from "@/categories/category.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: "avatar_link" })
    avatarLink: string;

    @Column()
    password: string;

    @Column({ type: "enum", default: UserRoles.CUSTOMER, enum: UserRoles })
    role: UserRoles;

    @Column({ name: "date_created", type: "timestamp" })
    dateCreated: Date;

    @Column({ name: "password_reset_code", nullable: true })
    passwordResetCode: string | null;

    @Column({ name: "password_reset_code_created_date", nullable: true, type: "timestamp" })
    passwordResetCodeCreatedDate: Date | null;

    @OneToMany(() => Category, category => category.user)
    categories: Category[];
}
