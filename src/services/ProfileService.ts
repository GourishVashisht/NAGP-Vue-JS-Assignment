import { api, setJWT } from "./api";
import { Profile } from "@/models/Profile";
import JWTService from "./JWTService";

export const ProfileService = {

    async fetchProfile(profileName: string): Promise<Profile> {
        await setJWT(typeof (JWTService.getJWTToken()) === "string"
            ? String(JWTService.getJWTToken()) : "");
        const response = await api.get(`/profiles/${profileName}`);
        return response.data.profile;
    }
};
