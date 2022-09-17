import { Module } from "@nestjs/common";
import { ArticleLibraryModule } from "./article-library/article-library.module";
import * as dotenv from "dotenv";

dotenv.config();

@Module({
	imports: [
        ArticleLibraryModule
    ],

	providers: [],
})
export class AppModule { }