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
            </ul>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { UserResponse } from "@/models/UserResponse";
import users from "@/store/modules/UserModule";

@Component
export default class Home extends Vue {
  private currentUser: UserResponse | null = null;

  private get username() {
    return users.username;
  }
  private async created() {
    await users.fetchUser();
  }
}
</script>