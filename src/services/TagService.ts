import { api } from "./api";

export const TagService = {

    async getTags(): Promise<string[]> {
        try {
            const response = await api.get("/tags");
            return response.data.tags;
        } catch (error) {
            throw error;
        }
    },

};
