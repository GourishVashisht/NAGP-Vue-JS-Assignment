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
    return articles.feed;
  }

  get tagName() {
    return tags.selectedTag;
  }

  @Watch("currentPage")
  public onPageChanged(): void {
    this.isLoading = true;
    this.getUpdatedFeed();
    window.scrollTo(0, 0);
  }

  private async created() {
    await articles.getFeed({
      offset: (this.currentPage - 1) * this.articlesPerPage,
      limit: this.articlesPerPage,
      tag: this.tagName
    });
    this.isLoading = false;
    this.articlesCount = articles.articlesCount;
  }

  private async getUpdatedFeed() {
    await articles.getFeed({
      offset: (this.currentPage - 1) * this.articlesPerPage,
      limit: this.articlesPerPage,
      tag: this.tagName
    });
    this.isLoading = false;
    this.articlesCount = articles.articlesCount;
  }
}
</script>
