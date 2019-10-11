<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

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
          <ArticleActions :canModify="isCurrentUser()" :slug="article.slug"></ArticleActions>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{article.body}}</p>
          <ul class="tag-list">
            <li v-for="(tag, index) in article.tagList" :key="index">
              <router-link class="tag-default tag-pill tag-outline" to="/">{{tag}}</router-link>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
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

          <ArticleActions :canModify="isCurrentUser()" :slug="article.slug"></ArticleActions>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Article } from "@/models/Article";
import { UserResponse } from "@/models/User";
import articles from "@/store/modules/ArticleModule";
import users from "@/store/modules/UserModule";
import Comment from "@/components/comments/Comment.vue";
import CommentEditor from "@/components/comments/CommentEditor.vue";
import ArticleActions from "@/components/article/ArticleActions.vue";

@Component({
  components: {
    ArticleActions
  }
})
export default class Articlee extends Vue {
  private isAuthenticated = true;
  private article: Article | null;
  private user: UserResponse | null;

  constructor() {
    super();
    this.article = null;
    this.user = null;
  }

  private created() {
    articles.getArticle(this.$route.params.slug).then(() => {
      this.article = articles.article;
    });
    users.fetchUser().then(() => {
      this.user = users.user;
    });
  }

  private isCurrentUser(): boolean {
    return this.user!.username && this.article!.author.username
      ? this.user!.username === this.article!.author.username
      : false;
  }
}
</script>
