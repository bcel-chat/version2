import Vue from "vue";
import Router from "vue-router";
import chat from "./chat";
import code from "@/helper/father.js";
import ds from "@/helper/deepstream.js";
import store from "@/stores/store.js";

Vue.use(Router);
var routers = [];
routers = routers.concat(chat);
const routes = routers;

const router = new Router({
  mode: "history",
  base: "/chat/",
  routes
});

router.beforeEach((to, from, next) => {
  localStorage.setItem("flexible_root_router", "/");
  let thor = {
    user: null
  };
  if (localStorage.getItem("thor")) {
    thor = JSON.parse(code.from(localStorage.getItem("thor")));
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (thor.user == null) {
      next({
        path: "/signin"
      });
    } else {
      if (from.name === null) {
        ds.login(
          {
            user: thor.user,
            password: thor.password
          },
          (success, data) => {
            if (success) {
              store.commit("Auth/setUserRole", data[0].role);
              store.commit("Settings/setProfile", {
                picture: data[0].picture,
                displayname: data[0].displayname,
                desc: data[0].description
              });
              next();
            }
          }
        );
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
