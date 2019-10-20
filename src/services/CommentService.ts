import { Comment } from "@/models/Comment";
import { api, setJWT } from "./api";
import JWTService from "./JWTService";

export const CommentService = {

    async getComments(slug: string): Promise<Comment[]> {
        try {
            const response = await api.get(`articles/${slug}/comments`);
            return response.data.comments;
        } catch (error) {
            throw error;
        }
    },

    async deleteComment(slug: string, commentId: number): Promise<any> {
        try {
            await setJWT(typeof (JWTService.getJWTToken()) === "string"
                ? String(JWTService.getJWTToken()) : "");
            const response = await api.delete(`articles/${slug}/comments/${commentId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async editComment(slug: string, commentId: number, commentBody: string): Promise<any> {
        try {
            await setJWT(typeof (JWTService.getJWTToken()) === "string"
                ? String(JWTService.getJWTToken()) : "");
            const response = await api.put(`articles/${slug}/comments/${commentId}`, {
                comment: {
                    body: commentBody
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async addComment(slug: string, commentBody: string): Promise<any> {
        try {
            await setJWT(typeof (JWTService.getJWTToken()) === "string"
                ? String(JWTService.getJWTToken()) : "");
            const response = await api.post(`articles/${slug}/comments`, {
                comment: {
                    body: commentBody
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
