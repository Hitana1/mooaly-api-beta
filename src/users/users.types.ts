import { IChangeUserPasswordDto, IChangeUserNameDto, IResetUserPasswordDto } from "@amatinya/mooaly-common-beta";

import { User } from "./user.entity";
import { DecodedJwtUser } from "@/jwt/jwt.types";

// Service
export interface IUsersService {
    createOne(details: CreateOneDetails): Promise<User>;
    findOneByEmail(details: FindOneByEmailDetails): Promise<User | null>;
    findById(details: FindByIdDetails): Promise<User | null>;
    findPublicDataById(details: FindPublicDataDetails): Promise<Pick<User, "id"> | null>;
    findByIdAndChangeName(details: FindByIdAndChangeNameDetails): Promise<void>;
    findByIdAndChangePassword(details: FindByIdAndChangePasswordDetails): Promise<void>;
    findByEmailAndSetPasswordResetCode(details: FindByEmailAndSetPasswordResetCodeDetails): Promise<void>;
    findByEmailAndResetPassword(details: FindByEmailAndResetPasswordDetails): Promise<void>;
}

// Service functions details
export type CreateOneDetails = Readonly<Pick<User, "name" | "avatarLink" | "email" | "password" | "role">>;
export type FindOneByEmailDetails = Readonly<Pick<User, "email">>;
export type FindByIdDetails = Readonly<Pick<User, "id">>;
export type FindPublicDataDetails = Readonly<Pick<DecodedJwtUser, "id">>;
export type FindByIdAndChangeNameDetails = Readonly<Pick<DecodedJwtUser, "id"> & IChangeUserNameDto>;
export type FindByIdAndChangePasswordDetails = Readonly<Pick<DecodedJwtUser, "id"> & IChangeUserPasswordDto>;
export type FindByEmailAndSetPasswordResetCodeDetails = Readonly<Pick<User, "email" | "passwordResetCode">>;
export type FindByEmailAndResetPasswordDetails = Readonly<IResetUserPasswordDto>;
