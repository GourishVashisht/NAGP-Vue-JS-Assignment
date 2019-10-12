import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home.vue"),
      children: [
        {
          name: "home",
          path: "/",
          component: () => import("@/views/GlobalFeed.vue")
        },
        {
          name: "home-my-feed",
          path: "/my-feed",
          component: () => import("@/views/MyFeed.vue")
        }
      ]
    },
    {
      name: "article",
      path: "/articles/:slug",
      component: () => import("@/views/Article.vue")
    },
    {
      name: "editor",
      path: "/editor/:slug?",
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
