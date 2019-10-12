<template>
  <div id="app">
    <AppNavbar></AppNavbar>
    <div class="routes">
      <router-view />
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import AppFooter from "@/components/layout/AppFooter.vue";
import AppNavbar from "@/components/layout/AppNavbar.vue";
import users from "@/store/modules/UserModule";

@Component({
  components: { AppFooter, AppNavbar }
})
export default class App extends Vue {
  // private created() {
  //   users.fetchUser();
  // }
}
</script>

<style>
.routes {
  margin-top: 40px;
  margin-bottom: 54px;
}
</style>
