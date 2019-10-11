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
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{ article.author.username }}
            <span
              class="counter"
            >(10)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post
            <span class="counter">(29)</span>
          </button>
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

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{ article.author.username }}
            <span
              class="counter"
            >(10)</span>
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post
            <span class="counter">(29)</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import articles from "@/store/modules/ArticleModule";
import Comment from "@/components/comments/Comment.vue";
import CommentEditor from "@/components/comments/CommentEditor.vue";

@Component
export default class Article extends Vue {
  private isAuthenticated = true;

  get article() {
    return articles.article;
  }
  private created() {
    articles.getArticle(this.$route.params.slug);
  }
}
</script>