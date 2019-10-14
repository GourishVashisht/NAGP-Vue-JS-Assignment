import { Comment } from "@/models/Comment";
import { api, setJWT } from "./api";
import JWTService from "./JWTService";

export const CommentService = {

    async getComments(slug: string): Promise<Comment[]> {
        const response = await api.get(`articles/${slug}/comments`);
        return response.data.comments;
    },

    async deleteComment(slug: string, commentId: number): Promise<any> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const response = await api.delete(`articles/${slug}/comments/${commentId}`);
        return response.data;
    },

    async editComment(slug: string, commentId: number, commentBody: string): Promise<any> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const response = await api.put(`articles/${slug}/comments/${commentId}`, {
            comment: {
                body: commentBody
            }
        });
        return response.data;
    },

    async addComment(slug: string, commentBody: string): Promise<any> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const response = await api.post(`articles/${slug}/comments`, {
            comment: {
                body: commentBody
            }
        });
        return response.data;
    }
};
