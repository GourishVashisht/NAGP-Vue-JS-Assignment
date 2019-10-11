import {
    VuexModule, Module, getModule, MutationAction
} from "vuex-module-decorators";
import store from "@/store";
import { ArticleService } from "@/services/ArticleService";
import { Article } from "@/models/Article";

@Module({
    dynamic: true,
    name: "articles",
    store
})
class ArticleModule extends VuexModule {

    public articles: Article[] = [];
    public article: Article | null = null;

    @MutationAction
    public async getArticles() {
        const articles = await ArticleService.getArticles();
        return { articles };
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
    public async modifyArticle({slug, art}) {
        const article = await ArticleService.modifyArticle(slug, art);
        return { article };
    }
}

export default getModule(ArticleModule);
