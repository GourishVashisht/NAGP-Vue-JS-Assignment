import { User, UserResponse } from "@/models/User";
import { api } from "./api";

export const UserService = {

    async loginUser(user: User): Promise<UserResponse> {
        const response = await api.post("/users/login", {
            user
        });
        return response.data.user;
    },

    async registerUser(user: User): Promise<UserResponse> {
        const response = await api.post("/users", {
            user
        });
        return response.data.user;
    },

    async fetchUser(): Promise<UserResponse> {
        const userResponse: UserResponse = await api.get("/user");
        return userResponse;
    }

};
