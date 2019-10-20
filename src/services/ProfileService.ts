import { api, setJWT } from "./api";
import { Profile } from "@/models/Profile";
import JWTService from "./JWTService";

export const ProfileService = {

    async fetchProfile(profileName: string): Promise<Profile> {
        try {
            const response = await api.get(`/profiles/${profileName}`);
            return response.data.profile;
        } catch (error) {
            throw error;
        }
    },

    async followProfileUser(profileName: string): Promise<Profile> {
        try {
            await setJWT(typeof (JWTService.getJWTToken()) === "string"
                ? String(JWTService.getJWTToken()) : "");
            const response = await api.post(`/profiles/${profileName}/follow`);
            return response.data.profile;
        } catch (error) {
            throw error;
        }
    },

    async unfollowProfileUser(profileName: string): Promise<Profile> {
        try {
            await setJWT(typeof (JWTService.getJWTToken()) === "string"
                ? String(JWTService.getJWTToken()) : "");
            const response = await api.delete(`/profiles/${profileName}/follow`);
            return response.data.profile;
        } catch (error) {
            throw error;
        }
    }
};
