import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "article",
      path: "/article",
      component: () => import("@/views/Article.vue")
    },
    {
      name: "editor",
      path: "/editor",
      component: () => import("@/views/Editor.vue")
    },
    {
      name: "home",
      path: "/home",
      component: () => import("@/views/Home.vue")
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/Login.vue")
    },
    {
      name: "profile",
      path: "/profile",
      component: () => import("@/views/Profile.vue")
    },
    {
      name: "settings",
      path: "/settings",
      component: () => import("@/views/Settings.vue")
    }
  ],
});
