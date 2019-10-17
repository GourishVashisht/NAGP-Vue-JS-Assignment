import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import DateFilter from "@/common/date.filter";
import * as icons from "@fortawesome/free-solid-svg-icons";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@babel/polyfill";
import "mutationobserver-shim";
import "./plugins/bootstrap-vue";

// Global styling used many components
import "@/assets/styles.css";

library.add(
  icons.faHeart,
  icons.faUserCircle,
  icons.faCopyright,
  icons.faTrashAlt,
  icons.faPencilAlt,
  icons.faTimesCircle,
  icons.faFilter);

Vue.component("fa-icon", FontAwesomeIcon);
Vue.filter("date", DateFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
