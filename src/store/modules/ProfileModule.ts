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

    @MutationAction
    public async fetchProfile(profileName: string) {
        const profile: Profile = await ProfileService.fetchProfile(profileName);
        return { profile };
    }
}

export default getModule(ProfileModule);
