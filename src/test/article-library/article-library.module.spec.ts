import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import supertest from "supertest";
import { AppModule } from "../../app.module";
import { ExpressAdapter } from "@nestjs/platform-express";
import { STATUS_CODES } from "http";

describe("ArticleLibraryModule", () => {

    let instance;
    let application: INestApplication;

    beforeEach(async () => {
        instance = ExpressAdapter.prototype.getInstance;
        application = await NestFactory.create(AppModule, instance, {
            logger: {
                log(message: string) { },
                error(message: string, trace: string) { },
                warn(message: string) { },
                debug(message: string) { },
                verbose(message: string) { }
            }
        });
        /* eslint "@typescript-eslint/no-empty-function": "off", "@typescript-eslint/no-unused-vars": "off" */
        application.useLogger({
            log(message: string) { },
            error(message: string, trace: string) { },
            warn(message: string) { },
            debug(message: string) { },
            verbose(message: string) { }
        });
        application.init();
    });

    afterEach(async function () {
        application.close();
    });

    it("Should expose GET method return", function () {
        supertest(application.getHttpServer())
            .get("/api/article-library/get-article")
            .expect(STATUS_CODES.OK);
    });
});