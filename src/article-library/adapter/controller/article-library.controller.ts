import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Logger,
	Query,
} from "@nestjs/common";
import { Article } from "../../domain/entity/article.entity";
import { GetArticleService } from "../../domain/service/article.service";

@Controller("article-library")
export class GetArticleController {
	private readonly logger = new Logger(GetArticleService.name);

	constructor(
        private readonly getArticleService: GetArticleService
	) {}

	@Get("get-article")
	async handle(
		@Query("theme") theme: string
	): Promise<Article[]> {        
	try {
			return await this.getArticleService.getAllByTheme(theme);
		} catch (e) {
			this.logger.error("Get article by theme Error")
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}