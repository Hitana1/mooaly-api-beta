import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "@/app/app.module";

const bootstrap = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.disable("x-powered-by");
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || ["http://localhost:5173", "https://finny,pro"].includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    });
    await app.listen(process.env.PORT || 8000);
};
bootstrap();
