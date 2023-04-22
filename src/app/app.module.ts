import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join as pathJoin } from "path";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "@/auth/auth.module";
import { ConfigVars } from "@/utils/constants";
import { UsersModule } from "@/users/users.module";
import { User } from "@/users/user.entity";
import { CategoriesModule } from "@/categories/categories.module";
import { Category } from "@/categories/category.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get<string>(ConfigVars.DB_HOST),
                port: parseInt(configService.get<string>(ConfigVars.DB_PORT)),
                username: configService.get<string>(ConfigVars.DB_USERNAME),
                password: configService.get<string>(ConfigVars.DB_PASSWORD),
                database: configService.get<string>(ConfigVars.DB_NAME),
                entities: [User, Category],
                synchronize: true, // TODO: Remove for production
            }),
            inject: [ConfigService],
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>(ConfigVars.MAILER_HOST),
                    auth: {
                        user: configService.get<string>(ConfigVars.MAILER_USER),
                        pass: configService.get<string>(ConfigVars.MAILER_PASSWORD),
                    },
                },
                defaults: {
                    from: `"${configService.get<string>(ConfigVars.APP_NAME)}" ${configService.get<string>(
                        ConfigVars.MAILER_FROM,
                    )}`,
                },
                template: {
                    dir: pathJoin(__dirname, "../mailer/templates"),
                    adapter: new HandlebarsAdapter(),
                    options: { strict: true },
                },
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        CategoriesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
