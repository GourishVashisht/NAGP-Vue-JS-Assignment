import {
    VuexModule, Module, getModule, MutationAction
} from "vuex-module-decorators";
import store from "@/store";
import { ArticleService } from "@/services/ArticleService";
import { Article, ArticleResponse } from "@/models/Article";

@Module({
    dynamic: true,
    name: "articles",
    store
})
class ArticleModule extends VuexModule {

    public articles: Article[] = [];
    public feed: Article[] = [];
    public article: Article | null = null;
    public articlesCount: number = 0;

    @MutationAction
    public async getArticles({ offset, limit }: { offset: number, limit: number }) {
        const articleResponse: ArticleResponse = await ArticleService.getArticles(offset, limit);
        return {
            articles: articleResponse.articles,
            articlesCount: articleResponse.articlesCount
        };
    }

    @MutationAction
    public async getFeed({ offset, limit }: { offset: number, limit: number }) {
        const articleResponse: ArticleResponse = await ArticleService.getFeed(offset, limit);
        return {
            feed: articleResponse.articles,
            articlesCount: articleResponse.articlesCount
        };
    }

    @MutationAction
    public async getArticle(slug: string) {
        const article = await ArticleService.getArticle(slug);
        return { article };
    }

    @MutationAction
    public async addArticle(art: Article | any) {
        const article = await ArticleService.addArticle(art);
        return { article };
    }

    @MutationAction
    public async deleteArticle(slug: string) {
        const article = await ArticleService.deleteArticle(slug);
        return { article };
    }

    @MutationAction
    public async modifyArticle({ slug, art }: { slug: string, art: Article }) {
        const article = await ArticleService.modifyArticle(slug, art);
        return { article };
    }
}

export default getModule(ArticleModule);
