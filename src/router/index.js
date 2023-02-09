import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/drug",
    component: () => import("../components/infoCard.vue"),
    // hidden: true,
  },
  {
    path: '/login',
    component: () => import("../views/login/index.vue")
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my/index"),
      },
      {
        path: "/share",
        name: "share",
        component: () => import("@/views/share/index"),
      },
    ],
  },

];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const protoken = localStorage.getItem('token')
//   const envtoken = localStorage.getItem('env-token')
//   const role = localStorage.getItem('role')
//   const userInfo = localStorage.getItem('userInfo')
//   if ((protoken || envtoken) && role && userInfo) {
//     if (to.path === "/login") {
//       next({ path: "/" })
//     } else {
//       next()
//     }
//   } else {
//     if (to.path !== "/login") {
//       next({ path: "/login" })
//     } else {
//       next()
//     }
//   }

// })
export default router;
