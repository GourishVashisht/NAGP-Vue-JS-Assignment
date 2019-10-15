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

      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i>
        {{ article.favoritesCount }}
      </button>
    </div>
    <router-link href class="preview-link" :to="'/articles/' + article.slug">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li v-for="(tag, index) in article.tagList" :key="index">
          <router-link class="tag-default tag-pill tag-outline" to="/">{{tag}}</router-link>
        </li>
      </ul>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Article } from "@/models/Article";
import TagList from "@/components/common/TagList.vue";

@Component({
  components: {
    TagList
  }
})
export default class ArticlePreview extends Vue {
  @Prop() public article?: Article;
}
</script>
