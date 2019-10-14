import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import DateFilter from "@/common/date.filter";

library.add(
  icons.faHeart,
  icons.faUserCircle,
  icons.faCopyright,
  icons.faTrashAlt,
  icons.faPencilAlt,
  icons.faTimesCircle);

Vue.component("fa-icon", FontAwesomeIcon);
Vue.filter("date", DateFilter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
