<template>
  <div class="profile profile-page">
    <div class="user-info" v-if="profile">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <div v-if="isCurrentUser()">
              <router-link class="btn btn-sm btn-outline-secondary action-btn btn-follow" to="/settings">
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </div>
            <div v-else>
              <button
                class="btn btn-sm btn-outline-secondary action-btn btn-follow"
                v-if="profile.following"
                @click="unfollowUser()"
              >
                <i class="ion-plus-round"></i>
                &nbsp;Unfollow
                {{ profile.username }}
              </button>
              <button
                class="btn btn-sm btn-outline-secondary action-btn btn-follow"
                v-if="!profile.following"
                @click="followUser()"
              >
                <i class="ion-plus-round"></i>
                &nbsp;Follow
                {{ profile.username }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{name: 'profile-articles'}"
                >My Articles</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{name: 'profile-favorite-articles'}"
                >Favorited Articles</router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { User } from "@/models/User";
import users from "@/store/modules/UserModule";
import profiles from "@/store/modules/ProfileModule";

@Component
export default class Profile extends Vue {
  get user() {
    return users.user;
  }

  get profile() {
    return profiles.profile;
  }

  private async created() {
    await profiles.fetchProfile(this.$route.params.username);
  }

  private isCurrentUser() {
    if (this.user && this.profile) {
      return this.user.username === this.profile.username;
    }
    return false;
  }

  private async followUser() {
    await profiles.followProfileUser(this.$route.params.username);
  }

  private async unfollowUser() {
    await profiles.unfollowProfileUser(this.$route.params.username);
  }
}
</script>

<style scoped>
.profile {
  margin-top: 40px;
}

.btn-follow:hover {
  color: white;
}
</style>