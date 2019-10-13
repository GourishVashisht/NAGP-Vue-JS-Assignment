<template>
  <b-navbar class="app-header" toggleable="lg" variant="light" fixed="top">
    <b-navbar-brand class="app-brand-name" to="/">Conduit</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">
          <i class="ion-home"></i>&nbsp;Home
        </b-nav-item>
        <b-nav-item v-if="!isAuthenticated" to="/login">
          <i class="ion-log-in"></i> Sign In
        </b-nav-item>
        <b-nav-item v-if="!isAuthenticated" to="/register">
          <i class="ion-person-add"></i> Sign Up
        </b-nav-item>
        <b-nav-item v-if="isAuthenticated" to="/editor">
          <i class="ion-compose"></i>&nbsp;New Article
        </b-nav-item>
        <b-nav-item v-if="isAuthenticated" to="/settings">
          <i class="ion-gear-a"></i>&nbsp;Settings
        </b-nav-item>

        <b-nav-item-dropdown v-if="username" right>
          <template v-slot:button-content>
            <em>
              <fa-icon icon="user-circle"></fa-icon>
              &nbsp;{{username}}
            </em>
          </template>
          <b-dropdown-item :to="'@' + username">
            <i class="ion-person"></i>
            &nbsp;Profile
          </b-dropdown-item>
          <b-dropdown-item @click="signoutUser()">
            <i class="ion-log-out"></i>&nbsp;Sign Out
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/UserModule";
import JWTService from "@/services/JWTService";

@Component
export default class AppNavbar extends Vue {
  private activeNavbarItem: string = "";

  get isAuthenticated(): boolean {
    return users.isAuthenticated;
  }

  get username(): string | null {
    return users.username;
  }

  private async signoutUser() {
    await users.logoutUser();
    if (this.$route.path !== "/") {
      this.$router.push("/");
    }
  }

  private async created() {
    if (JWTService.getJWTToken()) {
      await users.fetchUser();
    }
  }

  private selectActiveNavText() {
    if (this.$route.name === "home") {
      this.activeNavbarItem = "home";
    } else if (this.$route.name === "login") {
      this.activeNavbarItem = "login";
    } else if (this.$route.name === "register") {
      this.activeNavbarItem = "register";
    } else if (this.$route.name === "editor") {
      this.activeNavbarItem = "editor";
    } else if (this.$route.name === "settings") {
      this.activeNavbarItem = "settings";
    } else if (this.$route.name === "profile") {
      this.activeNavbarItem = "profile";
    }
  }
}
</script>

<style scoped>
.app-brand-name {
  margin-left: 30px !important;
  text-transform: lowercase !important;
}
.navTextActive {
  text-decoration-line: underline;
}
</style>