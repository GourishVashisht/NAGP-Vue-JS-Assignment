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
          <ArticleActions :canModify="isCurrentUser" :slug="article.slug"></ArticleActions>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{article.body}}</p>
          <TagList :tags="article.tagList" />
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
          <div class="article-actions">
            <ArticleActions :canModify="isCurrentUser" :slug="article.slug"></ArticleActions>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
              <CommentEditor v-if="isAuthenticated" :slug="article.slug" :image="user.image"></CommentEditor>
              <p v-else class="display-flex">
                <router-link to="/login" class="router-link-text">Sign in</router-link>&nbsp;or
                <router-link to="/register" class="router-link-text">&nbsp;Sign up</router-link>&nbsp;to add comments on this article.
              </p>
              <CommentCard
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                :slug="article.slug"
                :user="user"
              ></CommentCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Article } from "@/models/Article";
import { UserResponse } from "@/models/User";
import { Comment } from "@/models/Comment";
import JWTService from "@/services/JWTService";
import CommentCard from "@/components/comment/CommentCard.vue";
import CommentEditor from "@/components/comment/CommentEditor.vue";
import ArticleActions from "@/components/article/ArticleActions.vue";
import TagList from "@/components/common/TagList.vue";
import articles from "@/store/modules/ArticleModule";
import users from "@/store/modules/UserModule";
import comments from "@/store/modules/CommentModule";

@Component({
  components: {
    ArticleActions,
    CommentCard,
    CommentEditor,
    TagList
  }
})
export default class MyArticle extends Vue {
  private article: Article | null;
  private user: UserResponse | null;
  private isCurrentUser: boolean;

  constructor() {
    super();
    this.article = null;
    this.user = null;
    this.isCurrentUser = false;
  }

  get isAuthenticated() {
    return users.isAuthenticated;
  }

  get comments() {
    return comments.comments;
  }

  private async created() {
    if (JWTService.getJWTToken()) {
      await users.fetchUser();
      this.user = users.user;
    }
    await articles.getArticle(this.$route.params.slug);
    await comments.getComments(this.$route.params.slug);
    this.article = articles.article;
    this.checkIfCurrentUser();
  }

  private checkIfCurrentUser(): void {
    if (this.user && this.article) {
      this.isCurrentUser =
        this.user!.username && this.article!.author.username
          ? this.user!.username === this.article!.author.username
          : false;
    } else {
      this.isCurrentUser = false;
    }
  }
}
</script>

<style scoped>
.router-link-text:hover {
  font-weight: 300;
}
.display-flex {
  display: flex;
}
</style>
