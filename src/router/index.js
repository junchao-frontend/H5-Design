import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";
import { Toast } from 'vant';

Vue.use(Toast);
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

router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem('token');
  // const userId = sessionStorage.getItem('userId');
  // console.log(to);
  if (to.path == '/login') {
    next();
  } else {
    if (!token) {
      Toast.fail('请先登陆！');
      next('/login');
    } else {
      next();
    }
  }
});
export default router;
