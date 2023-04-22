import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { User } from "@/users/user.entity";

@Entity({ name: "categories" })
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: "date_created", type: "timestamp" })
    dateCreated: Date;

    @ManyToOne(() => User, user => user.categories)
    user: User;
}
