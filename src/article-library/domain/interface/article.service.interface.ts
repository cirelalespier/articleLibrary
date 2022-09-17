import { Article } from "../entity/article.entity";

export interface ArticleServiceInterface {
    getArticleList(theme: string): Promise<Article[]>;
}