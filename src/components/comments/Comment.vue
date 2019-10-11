<template>
    <div>comment</div>
  <!-- <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      <router-link
        class="comment-author"
        :to="{ name: 'profile', params: { username: comment.author.username } }"
      >
        {{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{ comment.createdAt | date }}</span>
      <span v-if="isCurrentUser" class="mod-options">
        <i class="ion-trash-a" v-on:click="destroy(slug, comment.id)"></i>
      </span>
    </div>
  </div> -->
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Comment extends Vue {}
</script>