import { api, setJWT, removeJWT } from "./api";
import { Article, ArticleResponse, ArticleSearchParams, ArticleSubmit } from "@/models/Article";
import JWTService from "./JWTService";

export const ArticleService = {

    async getArticles(articleSearchParams: ArticleSearchParams): Promise<ArticleResponse> {
        await removeJWT();
        const ARTICLE_URL = `/articles?offset=${articleSearchParams.offset}&limit=${articleSearchParams.limit}`;
        const TAG_URL = articleSearchParams.tag ? `&tag=${articleSearchParams.tag}` : "";
        const AUTHOR_URL = articleSearchParams.author ? `&author=${articleSearchParams.author}` : "";
        const FAVORITED_URL = articleSearchParams.favorited ? `&favorited=${articleSearchParams.favorited}` : "";
        const res = await api.get(`${ARTICLE_URL}${TAG_URL}${AUTHOR_URL}${FAVORITED_URL}`);
        return res.data;
    },

    async getFeed(articleSearchParams: ArticleSearchParams): Promise<ArticleResponse> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const FEED_URL = `/articles/feed?offset=${articleSearchParams.offset}&limit=${articleSearchParams.limit}`;
        const TAG_URL = articleSearchParams.tag ? `&tag=${articleSearchParams.tag}` : "";
        const res = await api.get(`${FEED_URL}${TAG_URL}`);
        return res.data;
    },

    async getArticle(slug: string): Promise<Article> {
        const res = await api.get("/articles/" + slug);
        return res.data.article;
    },

    async addArticle(article: ArticleSubmit): Promise<Article> {
        try {
            await setJWT(typeof (JWTService.getJWTToken()) === "string"
                ? String(JWTService.getJWTToken()) : "");
            const res = await api.post("/articles/", {
                article
            });
            return res.data.article;
        } catch (error) {
            throw error;
        }
    },

    async modifyArticle(slug: string, article: ArticleSubmit): Promise<Article> {
        try {
            await setJWT(typeof (JWTService.getJWTToken()) === "string"
                ? String(JWTService.getJWTToken()) : "");
            const res = await api.put("/articles/" + slug, {
                article
            });
            return res.data.article;
        } catch (error) {
            throw error;
        }
    },

    async deleteArticle(slug: string): Promise<Article> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const res = await api.delete("/articles/" + slug);
        return res.data.article;
    },

    async addFavoriteArticle(slug: string) {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const res = await api.post(`/articles/${slug}/favorite`);
        return res.data;
    },

    async removeFavoriteArticle(slug: string) {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const res = await api.delete(`/articles/${slug}/favorite`);
        return res.data;
    },

    async getFavoriteArticles(articleSearchParams: ArticleSearchParams): Promise<ArticleResponse> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const ARTICLE_URL = `/articles?offset=${articleSearchParams.offset}&limit=${articleSearchParams.limit}`;
        const FAVORITED_URL = articleSearchParams.favorited ? `&favorited=${articleSearchParams.favorited}` : "";
        const res = await api.get(`${ARTICLE_URL}${FAVORITED_URL}`);
        return res.data;
    },
};
