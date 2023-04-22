import { ISignInDto, ISignUpDto } from "@amatinya/mooaly-common-beta";

import { DecodedJwtUser } from "@/jwt/jwt.types";

// Service
export interface IAuthService {
    signUp(params: SignInDetails): Promise<{ accessToken: string }>;
    signIn(params: SignUpDetails): Promise<{ accessToken: string }>;
    verifyAccessToken(params: VerifyAccessTokenDetails): Promise<{ accessToken: string }>;
}

// Service functions details
export type SignInDetails = Readonly<ISignInDto>;
export type SignUpDetails = Readonly<ISignUpDto>;
export type VerifyAccessTokenDetails = Readonly<Pick<DecodedJwtUser, "id" | "role">>;
