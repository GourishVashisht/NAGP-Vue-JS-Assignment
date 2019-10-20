<template>
  <div>
    <div v-if="!articlesCount" class="article-preview">No articles are here... yet.</div>
    <div v-if="articlesCount">
      <ArticlePreview
        id="article-preview"
        v-for="article in articles"
        :article="article"
        :key="article.slug"
      ></ArticlePreview>
      <b-pagination
        v-model="currentPage"
        :total-rows="articlesCount"
        :per-page="articlesPerPage"
        limit="10"
      ></b-pagination>
      <span class="tag-name">{{tagName}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import ArticlePreview from "@/components/article/ArticlePreview.vue";
import articles from "@/store/modules/ArticleModule";
import tags from "@/store/modules/TagModule";

@Component({
  components: {
    ArticlePreview
  }
})
export default class MyFeed extends Vue {
  @Prop() private shouldListBeFetchedAgain?: boolean;
  private isLoading: boolean = true;
  private currentPage: number = 1;
  private articlesPerPage: number = 10;
  private articlesCount: number = 0;
  private selectedTag: string = "";
  private tag: string = "";

  get articles() {
    return articles.feed;
  }

  get tagName() {
    if (tags.selectedTag) {
      this.tag = tags.selectedTag;
      this.getUpdatedFeed();
    } else {
      this.tag = "";
    }
    return tags.selectedTag;
  }

  @Watch("currentPage")
  public onPageChanged(): void {
    this.isLoading = true;
    this.getUpdatedFeed();
    window.scrollTo(0, 0);
  }

  @Watch("shouldListBeFetchedAgain")
  public refreshListAgain(): void {
    if (this.shouldListBeFetchedAgain) {
      this.isLoading = true;
      this.getUpdatedFeed();
      this.$emit("toggleState", !this.shouldListBeFetchedAgain);
    }
  }

  private async created() {
    await this.getArticlesFeed();
  }

  private async getUpdatedFeed() {
    await this.getArticlesFeed();
  }

  private async getArticlesFeed() {
    await articles.getFeed({
      offset: (this.currentPage - 1) * this.articlesPerPage,
      limit: this.articlesPerPage,
      tag: this.tag
    });
    this.isLoading = false;
    this.articlesCount = articles.articlesCount;
  }
}
</script>

<style scoped>
.tag-name {
  display: none;
}
</style>