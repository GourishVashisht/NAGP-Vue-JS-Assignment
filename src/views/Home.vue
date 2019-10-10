<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link" to="/">Your Feed</a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" active-class="active" to="/">Global Feed</router-link>
              </li>
            </ul>
          </div>

          <div v-if="isLoading" class="article-preview">Loading articles...</div>
          <ArticlePreview v-for="article in articles" :article="article" :key="article.slug"></ArticlePreview>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ArticleService } from "@/services/ArticleService";
import { Article } from "@/models/Article";
import ArticlePreview from "@/components/article/ArticlePreview";
import articles from "@/store/modules/ArticleModule";

@Component({
  components: {
    ArticlePreview
  }
})
export default class Home extends Vue {
  private isLoading = true;

  get articles() {
    return articles.articles;
  }

  public async created() {
    await articles.getArticles();
    this.isLoading = false;
  }
}
</script>