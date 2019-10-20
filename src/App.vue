<template>
  <div id="app">
    <AppNavbar></AppNavbar>
    <router-view></router-view>
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
export default class App extends Vue {}
</script>
