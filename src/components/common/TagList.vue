<template>
  <ul class="tag-list">
    <li
      class="tag-default tag-pill tag-outline tag-item"
      v-for="(tag, index) of tags"
      :key="index"
    >{{ tag }}</li>
  </ul>
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit } from "vue-property-decorator";
import tags from "@/store/modules/TagModule";

@Component
export default class TagList extends Vue {
  @Prop() private tags?: string[];

}
</script>
