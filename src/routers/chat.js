const Home = () => import("@/views/Home.vue");
const Login = () => import("@/views/auth/SignIn.vue");
const Rooms = () => import("@/components/rooms/RoomIndex.vue");
const Modules = () => import("@/views/home/Modules.vue");

import flexible from "./flexible";

const route = [
  {
    path: "/",
    name: "chat",
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/rooms/:id",
        name: "Rooms",
        component: Rooms
      },
      {
        path: "/modules",
        name: "Modules",
        component: Modules,
        children: flexible
      }
    ]
  },
  {
    path: "/signin",
    name: "Signin",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("thor")) {
        next({
          path: "/"
        });
      } else {
        next();
      }
    }
  }
];

export default route;
