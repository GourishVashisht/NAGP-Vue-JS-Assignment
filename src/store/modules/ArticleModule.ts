import {
    VuexModule, Module, getModule, MutationAction, Mutation, Action
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

    @Mutation
    public updateArticleInArticleList(article: Article) {
        this.articles = this.articles.map((data) => {
            if (data.slug !== article.slug) {
                return data;
            }
            data.favorited = article.favorited;
            data.favoritesCount = article.favoritesCount;
            return data;
        });
    }

    @MutationAction
    public async getArticles({ offset, limit, tag }: { offset: number, limit: number, tag: string }) {
        const articleResponse: ArticleResponse = await ArticleService.getArticles(offset, limit, tag);
        return {
            articles: articleResponse.articles,
            articlesCount: articleResponse.articlesCount
        };
    }

    @MutationAction
    public async getFeed({ offset, limit, tag }: { offset: number, limit: number, tag: string }) {
        const articleResponse: ArticleResponse = await ArticleService.getFeed(offset, limit, tag);
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

    @Action
    public async addFavoriteArticle(slug: string) {
        const response = await ArticleService.addFavoriteArticle(slug);
        await this.context.commit("updateArticleInArticleList", response.article);
    }

    @Action
    public async removeFavoriteArticle(slug: string) {
        const response = await ArticleService.removeFavoriteArticle(slug);
        await this.context.commit("updateArticleInArticleList", response.article);
    }


}

export default getModule(ArticleModule);
