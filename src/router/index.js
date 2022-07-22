import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import { useUserStore } from "@/stores/userStore";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    // meta: { requiresAuth: false },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    // meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const store = useUserStore();

      store
        .check_token()
        .then(() => {
          // console.log("meta: " + to.meta.requiresAuth);
          // console.log("loggedin: " + store.loggedIn);
          // if (!store.loggedIn) {
          // next("/");
          // } else {
          next();
          // }
        })
        .catch(() => {
          // console.log("meta: " + to.meta.requiresAuth);
          // console.log("loggedin: " + store.loggedIn);
          // if (!store.loggedIn) {
          next("/");
          // } else {
          // next();
          // }
        });
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const store = useUserStore();

//   store
//     .check_token()
//     .then(() => {
//       console.log("meta: " + to.meta.requiresAuth);
//       console.log("loggedin: " + store.loggedIn);
//       if (to.meta.requiresAuth && !store.loggedIn) {
//         next("/");
//       } else {
//         next();
//       }
//     })
//     .catch(() => {
//       console.log("meta: " + to.meta.requiresAuth);
//       console.log("loggedin: " + store.loggedIn);
//       if (to.meta.requiresAuth && !store.loggedIn) {
//         next("/");
//       } else {
//         next();
//       }
//     });
// });

export default router;
