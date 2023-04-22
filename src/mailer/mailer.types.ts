// Service
export interface IMailerService {
    sendPasswordRecoveryCode(SendPasswordRecoveryCodeDetails): Promise<void>;
}

// Service functions details
export type SendPasswordRecoveryCodeDetails = Readonly<{
    to: string;
    code: string;
}>;
