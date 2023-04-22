import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRoles } from "@amatinya/mooaly-common-beta";

import { SignInDetails, SignUpDetails, VerifyAccessTokenDetails, IAuthService } from "./auth.types";
import { UsersService } from "@/users/users.service";
import { Bcrypt } from "@/utils/lib";
import { JwtService } from "@/jwt/jwt.service";

@Injectable()
export class AuthService implements IAuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async signIn(details: SignInDetails) {
        // Check email
        const user = await this.usersService.findOneByEmail({ email: details.email });
        if (user === null) {
            throw new NotFoundException("sign-in.server-errors.invalid-credentials");
        }
        // Check passwords
        const passwordsMatch = await Bcrypt.compare(details.password, user.password);
        if (!passwordsMatch) {
            throw new NotFoundException("sign-in.server-errors.invalid-credentials");
        }
        // Sign access token
        const accessToken = this.jwtService.signUser({ id: user.id, role: user.role });
        return { accessToken };
    }

    async signUp(details: SignUpDetails) {
        // Check email
        const user = await this.usersService.findOneByEmail({ email: details.email });
        if (user !== null) {
            throw new ConflictException("sign-up.server-errors.email-is-taken");
        }
        // Hash password
        const hashedPassword = await Bcrypt.hash(details.password);
        // Create a user
        const newUser = await this.usersService.createOne({
            name: details.name,
            email: details.email,
            password: hashedPassword,
            role: UserRoles.CUSTOMER,
            avatarLink: "https://drive.google.com/uc?export=view&id=1MiAL_W-JUy7f8iRkaeiq1o-oymBMKD8V",
        });
        // Sign access token
        const accessToken = this.jwtService.signUser({ id: newUser.id, role: newUser.role });
        return { accessToken };
    }

    async verifyAccessToken(details: VerifyAccessTokenDetails) {
        // Find user
        const user = await this.usersService.findById({ id: details.id });
        // Check user and role
        if (user === null || details.role !== user.role) {
            throw new UnauthorizedException("Unauthorized");
        }
        // Sign access token
        const accessToken = this.jwtService.signUser({ id: user.id, role: user.role });
        return { accessToken };
    }
}
