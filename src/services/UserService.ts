import { User, UserResponse } from "@/models/User";
import { api, setJWT } from "./api";
import JWTService from "./JWTService";

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
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const userResponse = await api.get("/user");
        return userResponse.data.user;
    }

};
