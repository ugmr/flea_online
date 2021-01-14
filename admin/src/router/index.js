import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: () => {
      if(store.state.isLogin === false) return {name: 'Login'};
      return {name: 'Dashboard'};
    },
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: 'Dashboard',
    meta: {
      requireAuth: true //需要登陆验证
    },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    children: [
    ]
  }
];

const router = new VueRouter({
  routes,
});

// 登陆拦截
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    if(store.state.isLogin) {
      next();
    } else {
      next({
        name: 'Login',
        query: {redirect: to.name}
      });
    }
  } else {
    next();
  }
});

export default router;
