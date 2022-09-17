import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { lastValueFrom, map } from "rxjs";
import { Article } from "../../domain/entity/article.entity";
import { ArticleServiceInterface } from "../../domain/interface/article.service.interface";

@Injectable()
export class ArticleService implements ArticleServiceInterface {
    constructor(
        private readonly httpService: HttpService,
        @Inject("NEWS_API_URL") private readonly url: string,
        @Inject("NEWS_API_ENTITY") private readonly entity: string,
        @Inject("NEWS_API_KEY") private readonly apiKey: string,
    ) { }

    public async getArticleList(theme: string): Promise<Article[]> {

        const filter = `q='${theme}'`;

        return lastValueFrom(this.httpService.get(
            `${this.url}/${this.entity}?${filter}&${this.apiKey}`
        ).pipe(
            map((res) => {
                return this.mapToEntity(res.data);
            }),
        ),
        );
    }

    mapToEntity(data: any): Article[] {
        const articleList: Article[] = [];

        data.articles.map((item: Article) => {
            const article = new Article();

            article.author = item.author;
            article.title = item.title;
            article.description = item.description;
    
            articleList.push(article);
        })
		return articleList;
	}
}
