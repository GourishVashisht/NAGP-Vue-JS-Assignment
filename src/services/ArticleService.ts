import { api, setJWT, removeJWT } from "./api";
import { Article, ArticleResponse } from "@/models/Article";
import JWTService from "./JWTService";

export const ArticleService = {

    async getArticles(offset: number, limit: number): Promise<ArticleResponse> {
        await removeJWT();
        const res = await api.get(`/articles?offset=${offset}&limit=${limit}`);
        return res.data;
    },
    async getFeed(offset: number, limit: number): Promise<ArticleResponse> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const res = await api.get(`/articles/feed?offset=${offset}&limit=${limit}`);
        return res.data;
    },
    async getArticle(slug: string): Promise<Article> {
        const res = await api.get("/articles/" + slug);
        return res.data.article;
    },
    async addArticle(article: Article): Promise<Article> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const res = await api.post("/articles/", {
            article
        });
        return res.data.article;
    },
    async deleteArticle(slug: string): Promise<Article> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const res = await api.delete("/articles/" + slug);
        return res.data.article;
    },
    async modifyArticle(slug: string, article: Article): Promise<Article> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const res = await api.put("/articles/" + slug, {
            article
        });
        return res.data.article;
    }
};
