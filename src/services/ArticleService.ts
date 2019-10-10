import { api } from "./api";
import { Article } from "@/models/Article";

export const ArticleService = {

    async getArticles(): Promise<Article[]> {
        const res = await api.get("/articles");
        return res.data.articles;
    },
    async getArticle(slug: string): Promise<Article> {
        const res = await api.get("/articles/" + slug);
        return res.data.article;
    },
    async addArticle(article: Article): Promise<Article> {
        const res = await api.post("/articles/", {
            article
        });
        return res.data.article;
    }

};
