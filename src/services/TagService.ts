import { api } from "./api";

export const TagService = {

    async getTags(): Promise<string[]> {
        const response = await api.get("/tags");
        return response.data.tags;
    },

};
