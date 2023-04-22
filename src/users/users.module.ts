import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "@/users/user.entity";
import { MailerModule } from "@/mailer/mailer.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), MailerModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
