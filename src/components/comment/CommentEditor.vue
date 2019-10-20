<template>
  <form class="card comment-form" @submit.prevent="postComment">
    <div class="card-block">
      <textarea
        class="form-control"
        v-model="commentBody"
        placeholder="Write a comment..."
        rows="3"
      ></textarea>
    </div>
    <div class="card-footer">
      <img :src="image" class="comment-author-img author-image-left" />
      <button class="btn btn-sm btn-primary">Post Comment</button>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import comments from "@/store/modules/CommentModule";

@Component
export default class CommentEditor extends Vue {
  private commentBody: string = "";
  @Prop() private slug?: string;
  @Prop() private image?: string;

  private async postComment() {
    await comments.addComment({
      slug: this.slug ? this.slug : "",
      commentBody: this.commentBody
    });
    this.commentBody = "";
  }
}
</script>
<style scoped>
.author-image-left {
  float: left;
}
</style>