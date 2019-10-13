import { Comment } from "@/models/Comment";
import { api } from "./api";

export const CommentService = {

    async getComments(slug: string): Promise<Comment[]> {
        const response = await api.get(`articles/${slug}/comments`);
        return response.data.comments;
    },

    async deleteComment(slug: string, commentId: number): Promise<any> {
        const response = await api.delete(`articles/${slug}/comments/${commentId}`);
        return response.data;
    },

    async editComment(slug: string, commentId: number, comment: Comment): Promise<any> {
        const response = await api.put(`articles/${slug}/comments/${commentId}`, {
            comment
        });
        return response.data;
    },
};
