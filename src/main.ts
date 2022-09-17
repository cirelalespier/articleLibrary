import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const logger = new Logger("Bootstrap");
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");

    await app.listen(process.env.PORT || 3000)
    .then(async () => logger.log(`Server is running on: ${await app.getUrl()}`))
    
}
bootstrap();
