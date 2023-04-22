import * as bcrypt from "bcrypt";

export class Bcrypt {
    static hash(value: string) {
        return bcrypt.hash(value, bcrypt.genSaltSync(10));
    }

    static compare(value: string, hash: string) {
        return bcrypt.compare(value, hash);
    }
}
