import { Module } from "@nestjs/common";
import { JwtModule as JwtModuleBase } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { JwtService } from "./jwt.service";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigVars } from "@/utils/constants";

@Module({
    imports: [
        JwtModuleBase.registerAsync({
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>(ConfigVars.JWT_ACCESS_TOKEN_PRIVATE_KEY),
                    signOptions: {
                        expiresIn: config.get<string>(ConfigVars.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [JwtService, JwtStrategy],
    exports: [JwtService],
})
export class JwtModule {}
