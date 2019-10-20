<template>
  <div>
    <nav class="navbar navbar-light navbar-color">
      <div class="container">
        <router-link class="navbar-brand" to="/">Conduit</router-link>
        <ul class="nav navbar-nav pull-xs-right navbar-items">
          <li class="nav-item">
            <router-link class="nav-link" id="home-navlink" to="/">
              <i class="ion-home"></i>&nbsp;Home
            </router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" id="login-navlink" to="/login">
              <i class="ion-log-in"></i>&nbsp;Sign In
            </router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" id="register-navlink" to="/register">
              <i class="ion-person-add"></i>&nbsp;Sign Up
            </router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" id="editor-navlink" to="/editor">
              <i class="ion-compose"></i>&nbsp;New Article
            </router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" id="settings-navlink" to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li class="nav-item" v-if="username">
            <b-dropdown
              id="dropdown-right"
              right
              :text="username"
              variant="outline-danger"
              class="m-1"
              size="sm"
            >
              <b-dropdown-item @click="navigateToProfile()">
                <i class="ion-person"></i>
                &nbsp;Profile
              </b-dropdown-item>
              <b-dropdown-item @click="signoutUser()">
                <i class="ion-log-out"></i>&nbsp;Sign Out
              </b-dropdown-item>
            </b-dropdown>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/UserModule";
import JWTService from "@/services/JWTService";

@Component
export default class AppNavbar extends Vue {
  get isAuthenticated() {
    return users.isAuthenticated;
  }

  get username() {
    return users.username;
  }

  private async created() {
    if (JWTService.getJWTToken()) {
      await users.fetchUser();
    }
  }

  private async signoutUser() {
    await users.logoutUser();
    if (this.$route.path !== "/") {
      this.$router.push("/");
    }
  }

  private navigateToProfile(): void {
    this.$router.push(`/@${users.username}`);
  }
}
</script>

<style scoped>
.app-brand-name {
  margin-left: 30px !important;
  text-transform: lowercase !important;
}
.navbar-color {
  background-color: rgb(250, 239, 239);
}
.navTextActive {
  text-decoration-line: underline;
}
.navbar-items {
  flex-direction: row !important;
}
</style>