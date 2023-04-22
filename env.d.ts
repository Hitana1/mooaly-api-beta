declare namespace NodeJS {
    export interface ProcessEnv {
        APP_NAME: string;
        /* HWT */
        JWT_ACCESS_TOKEN_PRIVATE_KEY: string;
        // JWT_ACCESS_TOKEN_PUBLIC_KEY: string; ??
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;
        /* Mailer */
        MAILER_HOST: string;
        MAILER_USER: string;
        MAILER_PASSWORD: string;
        MAILER_FROM: string;
        /* Google API */
        GOOGLE_API_CLIENT_ID: string;
        GOOGLE_API_CLIENT_SECRET: string;
        /* Database */
        DB_HOST: string;
        DB_PORT: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_NAME: string;
    }
}
