<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light">
      <b-collapse id="nav-collapse" is-nav>
        <span>Add somethings here !</span>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <span>
            Made with
            <fa-icon class="footer-heart" icon="heart" />By Gourish Vashisht
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
</style>