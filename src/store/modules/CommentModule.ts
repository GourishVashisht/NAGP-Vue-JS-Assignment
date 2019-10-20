import {
    VuexModule, Module, getModule, Action, Mutation
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

    @Mutation
    public setComments(comments: Comment[]) {
        this.comments = comments;
    }

    @Action({ commit: "setComments", rawError: true })
    public async getComments(slug: string) {
        try {
            const comments: Comment[] = await CommentService.getComments(slug);
            return comments;
        } catch (error) {
            throw error;
        }
    }

    @Action({ rawError: true })
    public async deleteComment({ slug, commentId }: { slug: string, commentId: number }) {
        try {
            await CommentService.deleteComment(slug, commentId);
            await this.context.dispatch("getComments", slug);
        } catch (error) {
            throw error;
        }
    }

    @Action({ rawError: true })
    public async editComment({ slug, commentId, commentBody }:
        { slug: string, commentId: number, commentBody: Comment | any }) {
        try {
            await CommentService.editComment(slug, commentId, commentBody);
            await this.context.dispatch("getComments", slug);
        } catch (error) {
            throw error;
        }
    }

    @Action({ rawError: true })
    public async addComment({ slug, commentBody }: { slug: string, commentBody: string }) {
        try {
            await CommentService.addComment(slug, commentBody);
            await this.context.dispatch("getComments", slug);
        } catch (error) {
            throw error;
        }
    }

}

export default getModule(CommentModule);
