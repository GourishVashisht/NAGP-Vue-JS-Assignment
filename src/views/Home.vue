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
              <li v-if="username" class="nav-item">
                <router-link class="nav-link" active-class="active" exact to="/my-feed">Your Feed</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" active-class="active" exact to="/">Global Feed</router-link>
              </li>
              <li class="nav-item" v-if="tagName">
                <span class="nav-link tag-name">
                  <fa-icon icon="filter"></fa-icon>
                  {{ tagName }}
                  <fa-icon class="close-icon" icon="times-circle" @click="removeTag()"></fa-icon>
                </span>
              </li>
            </ul>
          </div>
          <router-view
            :shouldListBeFetchedAgain="shouldListBeFetched"
            @toggleState="refreshState()"
          ></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <HomeTagList :tags="tags" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/UserModule";
import HomeTagList from "@/components/common/HomeTagList.vue";
import tags from "@/store/modules/TagModule";

@Component({
  components: {
    HomeTagList
  }
})
export default class Home extends Vue {
  private shouldListBeFetchedAgain: boolean = false;

  private async created() {
    await tags.getTags();
  }

  private get username() {
    return users.username;
  }

  private get tags() {
    return tags.tags;
  }

  private get tagName() {
    return tags.selectedTag;
  }

  private get shouldListBeFetched(): boolean {
    return this.shouldListBeFetchedAgain;
  }

  private refreshState(): void {
    this.shouldListBeFetchedAgain = !this.shouldListBeFetchedAgain;
  }

  private async removeTag() {
    await tags.setSelectedTag("");
    this.shouldListBeFetchedAgain = true;
  }
}
</script>

<style scoped>
.tag-name {
  color: rgb(83, 79, 79) !important;
  font-style: italic !important;
  background-color: rgb(248, 248, 229) !important;
  cursor: pointer;
}

.close-icon {
  left: 22px;
  position: relative;
  bottom: 18px;
  cursor: pointer;
}
.close-icon:hover {
  color: rgb(0, 0, 0) !important;
}
</style>