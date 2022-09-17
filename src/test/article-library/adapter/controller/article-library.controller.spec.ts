import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";
import { describe, expect } from '@jest/globals';
import sinon = require("sinon");
import { HttpException, HttpStatus } from "@nestjs/common";
import { GetArticleController } from "../../../../article-library/adapter/controller/article-library.controller";
import { GetArticleService } from "../../../../article-library/domain/service/article.service";

describe("GetArticleController", () => {
    let controller: GetArticleController;
    let testingModule: TestingModule;

    const fakeArticle = {
        author: "any_author",
        title: "any_title",
        description: "any_description"
    };

    const mockGetArticleService = {
        getAllByTheme: () => {
            return Promise.resolve(fakeArticle);
        },
    };

    beforeEach(async () => {
        testingModule = await Test.createTestingModule({
            controllers: [GetArticleController],
            providers: [
                {
                    provide: GetArticleService,
                    useFactory: () => mockGetArticleService,
                }
            ],
        })
            .compile();
        controller = testingModule.get<GetArticleController>(
            GetArticleController,
        );
    });

    afterEach(async () => {
        testingModule.close();
    });

    describe("#get", () => {
        describe("Check if get works", () => {
            it("Should verify if getAllByTheme returns errors correctly", async () => {
                const serviceStub = sinon.spy(
                    mockGetArticleService,
                    "getAllByTheme",
                );
                const result = await controller.handle("any_author");
                expect(result).toBe(fakeArticle);

                serviceStub.restore();
            });
        });

        
        describe("Check if get return error", () => {
        it("Should return httpException when catch any error", async () => {
                const serviceErrorStub = sinon.stub(
                    mockGetArticleService,
                    "getAllByTheme"
                    )
                    .throws(
                    new HttpException("any_Error", HttpStatus.INTERNAL_SERVER_ERROR)
                );
                
                await controller.handle("any_author").catch(error => {
                    expect(error).toBeInstanceOf(HttpException);
                    expect(error.getStatus()).toBe(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                    expect(error).toHaveProperty("message", "any_Error");
                });

                serviceErrorStub.restore();
            });
        });
    });
});