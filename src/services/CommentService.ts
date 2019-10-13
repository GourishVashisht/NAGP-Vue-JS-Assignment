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
};
