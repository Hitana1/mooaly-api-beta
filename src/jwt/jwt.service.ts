import { Injectable } from "@nestjs/common";
import { JwtService as JwtServiceBase } from "@nestjs/jwt";

import { SignUserDetails, IJwtService } from "./jwt.types";

@Injectable()
export class JwtService implements IJwtService {
    constructor(private jwtServiceBase: JwtServiceBase) {}

    signUser(details: SignUserDetails) {
        return this.jwtServiceBase.sign({
            id: details.id,
            role: details.role,
        });
    }
}
