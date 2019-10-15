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
        limit="5"
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
export default class ProfileArticles extends Vue {
  private isLoading: boolean = true;
  private currentPage: number = 1;
  private articlesPerPage: number = 5;
  private articlesCount: number = 0;

  get articles() {
    return articles.articles;
  }

  @Watch("currentPage")
  public onPageChanged(): void {
    this.isLoading = true;
    this.getUpdatedArticlesForProfile();
    window.scrollTo(0, 0);
  }

  private async created() {
    await articles.getArticles({
      offset: (this.currentPage - 1) * this.articlesPerPage,
      limit: this.articlesPerPage,
      author: this.$route.params.username
    });
    this.isLoading = false;
    this.articlesCount = articles.articlesCount;
  }

  private async getUpdatedArticlesForProfile() {
    await articles.getArticles({
      offset: (this.currentPage - 1) * this.articlesPerPage,
      limit: this.articlesPerPage,
      author: this.$route.params.username
    });
    this.isLoading = false;
    this.articlesCount = articles.articlesCount;
  }
}
</script>