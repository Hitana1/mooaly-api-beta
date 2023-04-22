import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

import { DecodedJwtUser } from "./jwt.types";
import { ConfigVars } from "@/utils/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>(ConfigVars.JWT_ACCESS_TOKEN_PRIVATE_KEY),
        });
    }

    validate(payload: DecodedJwtUser) {
        return payload;
    }
}
