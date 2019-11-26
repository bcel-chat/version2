import Vue from "vue";
import App from "./App.vue";
import router from "./routers/router";
import store from "./stores/store";
import "vue-material-design-icons/styles.css";
import "animate.css/animate.min.css";
import material from "./plugins/icons/meterial";
import moment from "vue-moment";
import "./registerServiceWorker";

Vue.use(moment);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.use(material);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
