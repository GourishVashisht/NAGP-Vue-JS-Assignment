<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link :to="'/@' + article.author.username">
        <img :src="article.author.image" />
      </router-link>

      <div class="info">
        <router-link
          class="author"
          :to="'/@' + article.author.username"
        >{{ article.author.username }}</router-link>
        <span class="date">{{ article.createdAt | date }}</span>
      </div>
      <button
        v-bind:class="{ favorite: (article.favorited && isFavoriteHighlighted) }"
        class="btn btn-outline-primary btn-sm pull-xs-right"
        @click="updateFavoriteArticle()"
      >
        <i class="ion-heart"></i>
        {{ article.favoritesCount }}
      </button>
    </div>
    <router-link href class="preview-link" :to="'/articles/' + article.slug">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <TagList :tags="article.tagList" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Article } from "@/models/Article";
import articles from "@/store/modules/ArticleModule";
import users from "@/store/modules/UserModule";
import TagList from "@/components/common/TagList.vue";

@Component({
  components: {
    TagList
  }
})
export default class ArticlePreview extends Vue {
  @Prop() public article?: Article;

  get isFavoriteHighlighted() {
    return users!.isAuthenticated;
  }

  private updateFavoriteArticle(): void {
    if (this.article!.favorited) {
      articles.removeFavoriteArticle(this.article!.slug);
    } else {
      articles.addFavoriteArticle(this.article!.slug);
    }
  }
}
</script>

<style scoped>
.favorite {
  color: #fff !important;
  background-color: #5cb85c !important;
  border-color: #5cb85c !important;
}
</style>
