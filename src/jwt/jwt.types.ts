import { UserRoles } from "@amatinya/mooaly-common-beta";

// Service
export interface IJwtService {
    signUser(details: SignUserDetails): string;
}

// Service functions details
export type SignUserDetails = Readonly<{
    id: number;
    role: UserRoles;
}>;

// Other
export type DecodedJwtUser = Readonly<{
    id: number;
    role: UserRoles;
    iat: number;
}>;
