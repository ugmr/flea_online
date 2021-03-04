import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes: [
    // 登陆
    {
      path: "/login",
      component: () => import("./views/Login/Index"),
      children: [
        {
          path: "",
          name: "Login",
          component: () => import("./views/Login/Login")
        }
      ]
    },
    // 忘记密码
    {
      path: "/forget",
      component: () => import("./views/Login/Index"),
      children: [
        {
          path: "",
          name: "Forget",
          component: () => import("./views/Login/Forget")
        }
      ]
    },
    // 管理页面
    {
      path: "/",
      component: () =>
          import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Index"),
      children: [
        // 跳转
        {
          path: "",
          redirect: () => {
            if(store.state.log.isLogin) return { name: "Dashboard" }
            else return { name: "Login" }
          }
        },
        // 首页
        {
          path: "dashboard",
          name: "Dashboard",
          meta: {
            // requireAuth: true, //需要登陆验证
          },
          component: () => import("./views/Dashboard/Dashboard")
        },
        // 推广管理
        {
          path: "advert",
          name: "Advert",
          meta: {
            // requireAuth: true,
          },
          component: () => import("./views/Dashboard/Advert")
        },
        // 举报信息
        {
          name: "Report",
          path: "/report",
          meta: {
            // requireAuth: true,
          },
          component: () => import("./views/Dashboard/Report")
        },
        {
          name: "Setting",
          meta: {
            // requireAuth: true
          },
          path: "/setting",
          component: () => import("./views/Dashboard/Setting")
        },
        {
          name: "Admin",
          path: "/admin",
          meta: {
            requireAuth: true
          },
          component: () => import("./views/Dashboard/Admin")
        },
        {
          name: "User",
          path: "/user",
          meta: {
            // requireAuth: true
          },
          component: () => import("./views/Dashboard/User")
        },
        {
          name: "Role",
          path: "/role",
          meta: {
            // requireAuth: true
          },
          component: () => import("./views/Dashboard/Role")
        },
        {
          name: "Permission",
          path: "/permission",
          meta: {
            // requireAuth: true
          },
          component: () => import("./views/Dashboard/Permission")
        },
        {
          name: "Post",
          path: "/post",
          meta: {
            // requireAuth: true
          },
          component: () => import("./views/Dashboard/Post")
        },
        {
          name: "Topic",
          path: "/topic",
          meta: {
            // requireAuth: true
          },
          component: () => import("./views/Dashboard/Topic")
        },
        {
          name: "Data",
          path: "/data",
          meta: {
            // requireAuth: true,
          },
          component: () => import("./views/Dashboard/Data")
        },
        {
          name: "Notice",
          path: "/notice",
          meta: {
            // requireAuth: true
          },
          component: () => import("./views/Dashboard/Notice")
        },
        {
          name: "Announcement",
          path: "/announcement",
          meta: {
            // requireAuth: true
          },
          component: () => import("./views/Dashboard/Announcement")
        },
        {
          name: "Examine",
          path: "/examine",
          meta: {
            // requireAuth: true,
          },
          component: () => import("./views/Dashboard/Examine")
        },
        {
          name: "Goods",
          path: "/goods",
          meta: {
          //  requireAuth: true,
          },
          component: () => import("./views/Dashboard/Goods")
        },
        {
          name: "Category",
          path: "/category",
          component: () => import("./views/Dashboard/Category")
        },
        {
          name: "Profile",
          path: "/profile",
          component: () => import("./views/Dashboard/Profile")
        },

        {
          name: "Order",
          path: "/order",
          component: () => import("./views/Dashboard/Order")
        },
        {
          name: "Password",
          path: "/password",
          component: () => import("./views/Dashboard/Password")
        }
      ]
    },
  ]
});

// 登陆拦截
router.beforeEach((to, from, next) => {
  store.commit("overlay/SHOW_OVERLAY");
  if (to.meta.requireAuth) {
    if (store.state.log.isLogin) {
      next();
    } else {
      next({
        name: "Login",
        query: { redirect: to.name },
      });
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  store.commit("overlay/HIDE_OVERLAY");
});

export default router;
