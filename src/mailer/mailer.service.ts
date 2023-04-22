import { Injectable, Logger } from "@nestjs/common";
import { MailerService as MailerServiceBase } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

import { IMailerService, SendPasswordRecoveryCodeDetails } from "./mailer.types";
import { ConfigVars } from "@/utils/constants";

@Injectable()
export class MailerService implements IMailerService {
    private readonly logger: Logger = new Logger(MailerService.name);

    constructor(private readonly mailerServiceBase: MailerServiceBase, private readonly configService: ConfigService) {}

    async sendPasswordRecoveryCode(details: SendPasswordRecoveryCodeDetails) {
        try {
            await this.mailerServiceBase.sendMail({
                to: details.to,
                from: this.configService.get<string>(ConfigVars.MAILER_FROM),
                subject: "Password Recovery",
                template: "password-recovery",
                context: {
                    code: details.code,
                },
            });
        } catch (error) {
            this.logger.error(`Password recovery code sent error to <${details.to}>`, error);
        }
    }
}
