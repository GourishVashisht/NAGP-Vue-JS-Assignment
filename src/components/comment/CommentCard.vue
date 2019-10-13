<template>
  <div class="card">
    <div class="card-block">
      <p v-if="!isEditMode" class="card-text">{{ comment.body }}</p>
      <input v-else v-model="commentBody" />
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
        <fa-icon class="pencil-icon user-action-button" icon="pencil-alt"></fa-icon>
        <fa-icon class="user-action-button" icon="trash-alt" @click="deleteComment()"></fa-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";
import { CommentService } from "@/services/CommentService";
import comments from "@/store/modules/CommentModule";

@Component
export default class CommentCard extends Vue {
  private isRefreshComments: boolean = false;
  private isEditMode: boolean = false;
  private commentBody: string = "";
  private editedComment?: Comment;
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
    if (this.user && this.comment!.author.username) {
      return this.comment!.author.username === this.user!.username;
    }
    return false;
  }

  private async deleteComment() {
    await comments.deleteComment({
      slug: this.slug ? this.slug : "",
      commentId: this.comment!.id
    });
    this.isRefreshComments = true;
    this.resetCommentList();
  }

  private async editComment() {
    this.isEditMode = true;
    this.editedComment = this.comment;
    this.editedComment!.body = this.commentBody;
    await comments.editComment({
      slug : this.slug ? this.slug : "",
      commentId: this.comment!.id,
      comment: this.editedComment
    });
    this.isRefreshComments = true;
    this.isEditMode = false;
    this.resetCommentList();
  }
}
</script>

<style scoped>
.pencil-icon {
  margin-right: 16px;
}

.user-action-button {
  font-size: 16px;
}

.user-action-button:hover {
  cursor: pointer;
  color: rgb(158, 147, 147);
}
</style>