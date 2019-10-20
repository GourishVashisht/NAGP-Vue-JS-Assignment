import {
    VuexModule, Module, getModule, MutationAction, Mutation, Action
} from "vuex-module-decorators";
import store from "@/store";
import { ArticleService } from "@/services/ArticleService";
import { Article, ArticleResponse, ArticleSearchParams, ArticleSubmit } from "@/models/Article";

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

    @MutationAction({ mutate: ["articles", "articlesCount"], rawError: true })
    public async getArticles(articleSearchParams: ArticleSearchParams) {
        try {
            const articleResponse: ArticleResponse = await ArticleService.getArticles(articleSearchParams);
            return {
                articles: articleResponse.articles,
                articlesCount: articleResponse.articlesCount
            };
        } catch (error) {
            throw error;
        }
    }

    @MutationAction({ mutate: ["feed", "articlesCount"], rawError: true })
    public async getFeed(articleSearchParams: ArticleSearchParams) {
        try {
            const articleResponse: ArticleResponse = await ArticleService.getFeed(articleSearchParams);
            return {
                feed: articleResponse.articles,
                articlesCount: articleResponse.articlesCount
            };
        } catch (error) {
            throw error;
        }
    }

    @MutationAction({ mutate: ["article"], rawError: true })
    public async getArticle(slug: string) {
        try {
            const article = await ArticleService.getArticle(slug);
            return { article };
        } catch (error) {
            throw error;
        }
    }

    @MutationAction({ mutate: ["article"], rawError: true })
    public async addArticle(articleSumbit: ArticleSubmit) {
        try {
            const article = await ArticleService.addArticle(articleSumbit);
            return { article };
        } catch (error) {
            throw error;
        }
    }

    @MutationAction({ mutate: ["article"], rawError: true })
    public async modifyArticle({ slug, art }: { slug: string, art: ArticleSubmit }) {
        try {
            const article = await ArticleService.modifyArticle(slug, art);
            return { article };
        } catch (error) {
            throw error;
        }
    }

    @MutationAction({ mutate: ["article"], rawError: true })
    public async deleteArticle(slug: string) {
        try {
            const article = await ArticleService.deleteArticle(slug);
            return { article };
        } catch (error) {
            throw error;
        }
    }

    @Action({ rawError: true })
    public async addFavoriteArticle(slug: string) {
        try {
            const response = await ArticleService.addFavoriteArticle(slug);
            await this.context.commit("updateArticleInArticleList", response.article);
        } catch (error) {
            throw error;
        }
    }

    @Action({ rawError: true })
    public async removeFavoriteArticle(slug: string) {
        try {
            const response = await ArticleService.removeFavoriteArticle(slug);
            await this.context.commit("updateArticleInArticleList", response.article);
        } catch (error) {
            throw error;
        }
    }

    @MutationAction({ mutate: ["articles", "articlesCount"], rawError: true })
    public async getFavoriteArticles(articleSearchParams: ArticleSearchParams) {
        try {
            const articleResponse: ArticleResponse = await ArticleService.getFavoriteArticles(articleSearchParams);
            return {
                articles: articleResponse.articles,
                articlesCount: articleResponse.articlesCount
            };
        } catch (error) {
            throw error;
        }
    }
}

export default getModule(ArticleModule);
