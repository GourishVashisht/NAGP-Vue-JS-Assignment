<template>
  <div>
    <b-navbar class="app-header" toggleable="lg" type="dark" variant="primary" fixed="top">
      <b-navbar-brand href="#">Conduit</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Home</b-nav-item>
          <b-nav-item href="#">Sign In</b-nav-item>
          <b-nav-item href="#">Sign Up</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// import users from '../store/modules/users';

@Component
export default class AppNavbar extends Vue {
  public signoutUser() {
    // users.setUser('');
    this.$router.push("/login");
  }
}
</script>

<style scoped>
.app-header {
  box-shadow: 0.5px 2px 6px rgb(37, 36, 36);
}
</style>
