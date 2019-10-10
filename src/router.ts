import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("@/views/Home.vue")
    },
    {
      name: "article",
      path: "/articles/:slug",
      component: () => import("@/views/Article.vue")
    },
    {
      name: "editor",
      path: "/editor",
      component: () => import("@/views/Editor.vue")
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/Login.vue")
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/views/Register.vue")
    },
    {
      name: "profile",
      path: "/@:username",
      component: () => import("@/views/Profile.vue")
    },
    {
      name: "settings",
      path: "/settings",
      component: () => import("@/views/Settings.vue")
    }
  ],
});
