<template>
  <span v-if="canModify">
    <router-link class="btn btn-sm btn-outline-secondary" :to="'/editor/'+ slug">
      <i class="ion-edit"></i>
      <span>&nbsp;Edit Article</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle()">
      <i class="ion-trash-a"></i>
      <span>&nbsp;Delete Article</span>
    </button>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import articles from "@/store/modules/ArticleModule";

@Component
export default class ArticleActions extends Vue {
  @Prop() private canModify?: boolean;
  @Prop() private slug?: string;

  private deleteArticle(): void {
    articles.deleteArticle(this.slug ? this.slug : "").then(() => {
      this.$router.push("/");
    });
  }
}
</script>