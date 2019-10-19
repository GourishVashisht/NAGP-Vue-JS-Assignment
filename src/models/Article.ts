import { Author } from "./Common";

export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList?: string[];
    createdAt?: string;
    updatedAt?: string;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
}

export interface ArticleResponse {
    articles: Article[];
    articlesCount: number;
}

export interface ArticleSearchParams {
    offset: number;
    limit: number;
    tag?: string;
    author?: string;
    favorited?: string;
}

export interface ArticleSubmit {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
}
