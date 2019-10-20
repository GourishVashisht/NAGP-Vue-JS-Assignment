import { User, UserResponse } from "@/models/User";
import { api, setJWT } from "./api";
import JWTService from "./JWTService";

export const UserService = {

    async loginUser(user: User): Promise<UserResponse> {
        try {
            const response = await api.post("/users/login", {
                user
            });
            return response.data.user;
        } catch (error) {
            throw error;
        }
    },

    async registerUser(user: User): Promise<UserResponse> {
        try {
            const response = await api.post("/users", {
                user
            });
            return response.data.user;
        } catch (error) {
            throw error;
        }
    },

    async modifyUser(user: UserResponse | null): Promise<UserResponse> {
        try {
            await setJWT(typeof (JWTService.getJWTToken()) === "string"
                ? String(JWTService.getJWTToken()) : "");
            const response = await api.put("/user", {
                user
            });
            return response.data.user;
        } catch (error) {
            throw error;
        }
    },

    async fetchUser(): Promise<UserResponse> {
        try {
            await setJWT(typeof (JWTService.getJWTToken()) === "string"
                ? String(JWTService.getJWTToken()) : "");
            const userResponse = await api.get("/user");
            return userResponse.data.user;
        } catch (error) {
            throw error;
        }
    }

};
