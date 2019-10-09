<template>
  <div>
    <b-navbar class="app-header" toggleable="lg" type="dark" variant="primary" fixed="top">
      <b-navbar-brand to="/">Conduit</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/home">Home</b-nav-item>
          <b-nav-item v-if="!username" to="/login">Sign In</b-nav-item>
          <b-nav-item v-if="!username" to="/register">Sign Up</b-nav-item>
          <b-nav-item v-if="username" to="/editor">New Article</b-nav-item>
          <b-nav-item v-if="username" to="/settings">Settings</b-nav-item>

          <b-nav-item-dropdown v-if="username" right>
            <template v-slot:button-content>
              <em>{{username}}</em>
            </template>
            <b-dropdown-item>
              <router-link :to="'@' + username">Profile</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="signoutUser()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/UserModule";

@Component
export default class AppNavbar extends Vue {
  get username(): string {
    return users.username;
  }

  public signoutUser(): void {
    users.logoutUser();
    if (this.$route.path !== "/home") {
      this.$router.push("/home");
    }
  }
}
</script>

<style scoped>
.app-header {
  box-shadow: 0.5px 2px 6px rgb(37, 36, 36);
}
</style>
