<template>
  <div id="app">
    <AppNavbar></AppNavbar>
    <div class="routes">
      <router-view />
    </div>
    <!-- <AppFooter></AppFooter> -->
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import AppFooter from "@/components/shared/AppFooter";
import AppNavbar from "@/components/shared/AppNavbar";

@Component({
  components: { AppFooter, AppNavbar }
})
export default class App extends Vue {}
</script>

<style>
.routes {
  margin-top: 54px;
  margin-bottom: 54px;
}
</style>
