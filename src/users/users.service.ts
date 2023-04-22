import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "@/users/user.entity";
import { Bcrypt } from "@/utils/lib";
import {
    CreateOneDetails,
    FindOneByEmailDetails,
    FindByIdDetails,
    IUsersService,
    FindPublicDataDetails,
    FindByIdAndChangeNameDetails,
    FindByIdAndChangePasswordDetails,
    FindByEmailAndSetPasswordResetCodeDetails,
    FindByEmailAndResetPasswordDetails,
} from "./users.types";

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async createOne(details: CreateOneDetails) {
        // Remove timezone
        const dateCreated = new Date();
        dateCreated.setHours(dateCreated.getHours() - dateCreated.getTimezoneOffset());
        // Create a user
        const newUser = this.usersRepository.create({
            name: details.name,
            email: details.email,
            password: details.password,
            avatarLink: details.avatarLink,
            role: details.role,
            dateCreated,
            passwordResetCode: null,
        });
        return this.usersRepository.save(newUser);
    }

    findOneByEmail(details: FindOneByEmailDetails) {
        return this.usersRepository.findOneBy({ email: details.email });
    }

    findById(details: FindByIdDetails) {
        return this.usersRepository.findOneBy({ id: details.id });
    }

    async findPublicDataById(details: FindPublicDataDetails) {
        // Find user
        const user = await this.usersRepository
            .createQueryBuilder("u")
            .where("u.id = :id", { id: details.id })
            .select(["u.id", "u.name", "u.email", "u.avatarLink", "u.role"])
            .getOne();
        // Check found user
        if (user === null) {
            throw new NotFoundException("User is not found");
        }
        return user;
    }

    async findByIdAndChangeName(details: FindByIdAndChangeNameDetails) {
        // Find user
        const user = await this.usersRepository
            .createQueryBuilder("u")
            .where("u.id = :id", { id: details.id })
            .select(["u.name", "u.id"])
            .getOne();
        // Check found user
        if (user === null) {
            throw new NotFoundException("User is not found");
        }
        // Change name
        user.name = details.newName;
        // Save changes
        await this.usersRepository.save(user);
    }

    async findByIdAndChangePassword(details: FindByIdAndChangePasswordDetails) {
        // Find user
        const user = await this.usersRepository
            .createQueryBuilder("u")
            .where("u.id = :id", { id: details.id })
            .select(["u.password", "u.id"])
            .getOne();
        // Check found user
        if (user === null) {
            throw new NotFoundException("User is not found");
        }
        // Compare passwords
        const doesPasswordsMatch = await Bcrypt.compare(details.currentPassword, user.password);
        if (!doesPasswordsMatch) {
            throw new UnauthorizedException("Passwords don't match");
        }
        // Change password
        user.password = await Bcrypt.hash(details.newPassword);
        // Save changes
        await this.usersRepository.save(user);
    }

    async findByEmailAndSetPasswordResetCode(details: FindByEmailAndSetPasswordResetCodeDetails) {
        // Find user
        const user = await this.usersRepository
            .createQueryBuilder("u")
            .where("u.email = :email", { email: details.email })
            .select("u.id")
            .getOne();
        // Check found user
        if (user === null) {
            throw new NotFoundException("password-recovery.server-errors.password-recovery.user-is-not-found");
        }
        // Remove timezone
        const dateCreated = new Date();
        dateCreated.setHours(dateCreated.getHours() - dateCreated.getTimezoneOffset());
        // Set password reset code
        user.passwordResetCode = details.passwordResetCode;
        user.passwordResetCodeCreatedDate = dateCreated;
        // Save changes
        await this.usersRepository.save(user);
    }

    async findByEmailAndResetPassword(details: FindByEmailAndResetPasswordDetails) {
        // Find user
        const user = await this.usersRepository
            .createQueryBuilder("u")
            .where("u.email = :email", { email: details.email })
            .select(["u.id", "u.passwordResetCode"])
            .getOne();
        // Check found user
        if (user === null) {
            throw new NotFoundException("password-recovery.server-errors.password-reset.user-is-not-found");
        }
        // Compare reset codes
        if (user.passwordResetCode !== details.resetCode) {
            throw new ForbiddenException("password-recovery.server-errors.password-reset.wrong-reset-code");
        }
        // TODO: Compare passwords and don't allow to use the old password
        // TODO: Check password reset code created date and don't allow to reset password if time (30m) is expired
        // Set new password
        user.password = await Bcrypt.hash(details.newPassword);
        // Remove password resetting data
        user.passwordResetCode = null;
        user.passwordResetCodeCreatedDate = null;
        // Save changes
        await this.usersRepository.save(user);
    }
}
