import {
    VuexModule, Module, getModule, MutationAction, Mutation
} from "vuex-module-decorators";
import store from "@/store";
import { TagService } from "@/services/TagService";

@Module({
    dynamic: true,
    name: "tags",
    store
})
class TagModule extends VuexModule {

    public selectedTag: string = "";
    public tags: string[] = [];

    @Mutation
    public setSelectedTag(tagName: string) {
        this.selectedTag = tagName;
    }

    @MutationAction({ mutate: ["tags"], rawError: true })
    public async getTags() {
        try {
            const tags: string[] = await TagService.getTags();
            return { tags };
        } catch (error) {
            throw error;
        }
    }
}

export default getModule(TagModule);
