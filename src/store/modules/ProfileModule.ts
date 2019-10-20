import {
    VuexModule, Module, getModule, MutationAction
} from "vuex-module-decorators";
import store from "@/store";
import { ProfileService } from "@/services/ProfileService";
import { Profile } from "@/models/Profile";

@Module({
    dynamic: true,
    name: "profiles",
    store
})
class ProfileModule extends VuexModule {

    public profile: Profile | null = null;

    @MutationAction({ mutate: ["profile"], rawError: true })
    public async fetchProfile(profileName: string) {
        try {
            const profile: Profile = await ProfileService.fetchProfile(profileName);
            return { profile };
        } catch (error) {
            throw error;
        }
    }
}

export default getModule(ProfileModule);
