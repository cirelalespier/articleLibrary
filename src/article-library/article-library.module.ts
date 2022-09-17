import { HttpModule } from "@nestjs/axios";
import { Logger, Module } from "@nestjs/common";
import * as dotenv from "dotenv";
import { GetArticleController } from "./adapter/controller/article-library.controller";
import { ArticleService } from "./adapter/service/article.service";
import { GetArticleService } from "./domain/service/article.service";

dotenv.config();

@Module({
	imports: [
		HttpModule,
    ],
	controllers: [
        GetArticleController
    ],
	providers: [
        Logger,
        GetArticleService,
        {
			provide: "NEWS_API_URL",
			useFactory: () => process.env.NEWS_API_URL,
		},
		{
			provide: "NEWS_API_ENTITY",
			useFactory: () => process.env.NEWS_API_ENTITY,
		},
		{
			provide: "NEWS_API_KEY",
			useFactory: () => process.env.NEWS_API_KEY,
		},
        {
			provide: "ArticleServiceInterface",
			useClass: ArticleService,
		},
    ],
})
export class ArticleLibraryModule { }