import Vue from "vue";
import Router from "vue-router";
import tags from "@/store/modules/TagModule";

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
          component: () => import("@/views/GlobalFeed.vue"),
          beforeEnter: (to, from, next) => {
            if (tags.selectedTag) {
              tags.setSelectedTag("");
            }
            next();
          }
        },
        {
          name: "home-my-feed",
          path: "/my-feed",
          component: () => import("@/views/MyFeed.vue"),
          beforeEnter: (to, from, next) => {
            if (tags.selectedTag) {
              tags.setSelectedTag("");
            }
            next();
          }
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
      name: "settings",
      path: "/settings",
      component: () => import("@/views/Settings.vue")
    },
    {
      path: "/@:username",
      component: () => import("@/views/Profile.vue"),
      children: [
        {
          name: "profile-articles",
          path: "",
          component: () => import("@/views/ProfileArticles.vue")
        },
        {
          name: "profile-favorite-articles",
          path: "favorites",
          component: () => import("@/views/ProfileFavoriteArticles.vue")
        }
      ]
    },
  ],
});
