<template>
  <div id="app">
    <AppNavbar></AppNavbar>
    <router-view />
    <AppFooter></AppFooter>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { AppFooter, AppNavbar } from '@/components/shared';

@Component({
  components: {AppFooter, AppNavbar}
})
export default class App extends Vue {}
</script>

<style>
body {
  background-color : rgb(247, 230, 230);
}
.routes{
  margin-top: 54px;
  margin-bottom: 54px;
}
</style>
