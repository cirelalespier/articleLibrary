import { Inject, Injectable, Logger } from "@nestjs/common";
import { Article } from "../entity/article.entity";
import { ArticleServiceInterface } from "../interface/article.service.interface";

@Injectable()
export class GetArticleService {

    private readonly logger = new Logger(GetArticleService.name);

    constructor(
        @Inject("ArticleServiceInterface") private readonly articleService: ArticleServiceInterface,
    ) { }

    async getAllByTheme(theme: string): Promise<Article[]> {
        try {
            return await this.getArticleList(theme);
        }
        catch (e) {
            const eMessage = e.message || e;
            this.logger.error(`Get article by theme error ${eMessage}`)
            throw e;
        }
    }

    async getArticleList(theme: string): Promise<Article[]> {
        return this.articleService.getArticleList(theme);
    }
}