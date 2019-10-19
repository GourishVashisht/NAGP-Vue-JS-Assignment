<template>
  <span v-if="!tags.length">Loading tags...</span>
  <ul v-else class="tag-list">
    <li class="tag-default tag-pill tag-outline tag-item" v-for="(tag, index) of tags" :key="index">
      <span @click="filterArticlesForTag(tag)">{{ tag }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit } from "vue-property-decorator";
import tags from "@/store/modules/TagModule";

@Component
export default class HomeTagList extends Vue {
  @Prop() private tags?: string[];

  private filterArticlesForTag(selectedTag: string) {
    tags.setSelectedTag(selectedTag);
  }
}
</script>

<style scoped>
.tag-item {
  background-color: #889096 !important;
  color: #fff !important;
  border: none;
}
.tag-item:hover {
  cursor: pointer;
  background-color: #5d6063 !important;
}
</style>
