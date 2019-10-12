<template>
  <div>
    <div v-if="isLoading" class="article-preview">Loading articles...</div>
    <div v-else>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import ArticlePreview from "@/components/article/ArticlePreview.vue";
import articles from "@/store/modules/ArticleModule";

@Component({
  components: {
    ArticlePreview
  }
})
export default class GlobalFeed extends Vue {
  private isLoading: boolean;
  private currentPage: number;
  private articlesPerPage: number;
  private articlesCount: number;

  constructor() {
    super();
    this.isLoading = true;
    this.currentPage = 1;
    this.articlesPerPage = 10;
    this.articlesCount = 0;
  }

  get articles() {
    return articles.articles;
  }

  @Watch("currentPage")
  public onPageChanged(): void {
    this.isLoading = true;
    this.getUpdatedArticles();
    window.scrollTo(0, 0);
  }

  private async created() {
    await articles.getArticles({
      offset: (this.currentPage - 1) * this.articlesPerPage,
      limit: this.articlesPerPage
    });
    this.isLoading = false;
    this.articlesCount = articles.articlesCount;
  }

  private async getUpdatedArticles() {
    await articles.getArticles({
      offset: (this.currentPage - 1) * this.articlesPerPage,
      limit: this.articlesPerPage
    });
    this.isLoading = false;
    this.articlesCount = articles.articlesCount;
  }
}
</script>
