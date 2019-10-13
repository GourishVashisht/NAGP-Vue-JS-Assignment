<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <span style="float: left">
        <router-link class="comment-author" :to="'/@' + comment.author.username">
          <img :src="comment.author.image" class="comment-author-img" />
        </router-link>
        <router-link
          class="comment-author"
          :to="'/@' + comment.author.username"
        >&nbsp;{{ comment.author.username }}</router-link>
        <span class="date-posted">{{ comment.createdAt | date }}</span>
      </span>
      <span v-if="isCurrentUser" class="mod-actions" style="float: right">
        <fa-icon class="user-action-button" icon="pencil-alt" @click="editComment()"></fa-icon>&nbsp;&nbsp;
        <fa-icon class="user-action-button" icon="trash-alt" @click="deleteComment()"></fa-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";
import { CommentService } from "../../services/CommentService";

@Component
export default class CommentCard extends Vue {
  private isRefreshComments: boolean = false;
  @Prop() private user?: User;
  @Prop() private comment?: Comment;
  @Prop() private slug?: string;

  @Emit()
  public resetCommentList() {
    if (this.isRefreshComments) {
      this.isRefreshComments = false;
      return true;
    } else {
      return false;
    }
  }

  get isCurrentUser() {
    if (this.user!.username && this.comment!.author.username) {
      return this.comment!.author.username === this.user!.username;
    }
    return false;
  }

  private async deleteComment() {
    await CommentService.deleteComment(
      this.slug ? this.slug : "",
      this.comment!.id
    );
    this.isRefreshComments = true;
    this.resetCommentList();
  }

}
</script>

<style scoped>
.user-action-button:hover {
  cursor: pointer;
}
</style>