import {
    VuexModule, Module, getModule, MutationAction, Action
} from "vuex-module-decorators";
import store from "@/store";
import { CommentService } from "@/services/CommentService";
import { Comment } from "@/models/Comment";

@Module({
    dynamic: true,
    name: "comments",
    store
})
class CommentModule extends VuexModule {

    public comments: Comment[] = [];

    @MutationAction
    public async getComments(slug: string) {
        const comments: Comment[] = await CommentService.getComments(slug);
        return { comments };
    }

    @Action
    public async deleteComment(slug: string, commentId: number) {
        const response = await CommentService.deleteComment(slug, commentId);
        return response;
    }

}

export default getModule(CommentModule);
