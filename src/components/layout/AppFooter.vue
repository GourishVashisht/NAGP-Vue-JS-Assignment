<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="light" fixed="bottom">
      <b-collapse class="footer-text" id="nav-collapse" is-nav>
        <router-link class="logo-font" to="/">conduit</router-link>
        <span class="attribution">
          &nbsp;NAGP Assignment 2019
          <fa-icon icon="copyright" />&nbsp;Nagarro
        </span>
        <b-navbar-nav class="ml-auto footer-name">
          <span>
            Made with
            <fa-icon class="footer-heart" icon="heart" />&nbsp;By Gourish Vashisht
          </span>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AppFooter extends Vue {}
</script>

<style scoped>
.footer-heart {
  color: red;
}
.footer-text {
  margin-left: 40px;
}
.footer-name {
  margin-right: 40px;
}
</style>