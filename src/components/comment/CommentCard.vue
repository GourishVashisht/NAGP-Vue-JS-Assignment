<template>
  <div class="card">
    <div class="card-block">
      <p v-if="!isEditMode" class="card-text">{{ comment.body }}</p>
      <textarea class="edit-text-area" v-else v-model="commentBody" />
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
      <span v-if="isCurrentUser && !isEditMode" class="mod-actions" style="float: right">
        <!-- <fa-icon class="pencil-icon user-action-button" icon="pencil-alt" @click="editComment()"></fa-icon> -->
        <fa-icon class="user-action-button" icon="trash-alt" @click="deleteComment()"></fa-icon>
      </span>
      <span v-if="isEditMode" class="mod-actions" style="float: right">
        <button
          class="btn btn-sm btn-primary edit-comment-button"
          @click="editCommentAndSave()"
        >Edit Comment</button>
        <fa-icon class="close-icon" icon="times-circle" @click="cancelCommentEditing()"></fa-icon>
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
  private isEditMode: boolean = false;
  private commentBody: string = "";
  private editedComment?: Comment;
  @Prop() private user?: User;
  @Prop() private comment?: Comment;
  @Prop() private slug?: string;

  private created(): void {
    this.commentBody = this.comment!.body;
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
  }

  private async editComment() {
    this.isEditMode = true;
    this.editedComment = this.comment;
  }

  private cancelCommentEditing(): void {
    this.isEditMode = false;
  }

  private async editCommentAndSave() {
    this.editedComment = this.comment;
    await comments.editComment({
      slug: this.slug ? this.slug : "",
      commentId: this.comment!.id,
      commentBody: this.commentBody
    });
    this.isEditMode = false;
  }
}
</script>

<style scoped>
.pencil-icon {
  margin-right: 16px;
}

.close-icon {
  margin-left: 12px;
  font-size: 16px !important;
}
.close-icon:hover {
  cursor: pointer;
  color: rgb(158, 147, 147);
}

.user-action-button {
  font-size: 16px;
}

.user-action-button:hover {
  cursor: pointer;
  color: rgb(158, 147, 147);
}

.edit-comment-button {
  font-size: 0.7rem;
}

.edit-text-area {
  height: auto;
  width: 100%;
  display: block;
}
</style>