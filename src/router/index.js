import Vue from "vue";
import VueRouter from "vue-router";
import { getTokenForStorage } from "@utils";
import Home from "@views/home";
import NotFound from "@views/not-found";
import NoPermissions from "@views/no-permissions";
import ScrollPage from "@views/scroll-page";
import UseBScrollComponent from "@views/use-bscroll-component";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@views/about/index.vue"),
    meta: {
      title: "群详情",
      // requireAuth: true,
      keepAlive: false // 页面生命一直存活（离开当前页面也存活）
    }
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "404页"
    }
  },
  {
    path: "/403",
    name: "NoPermissions",
    component: NoPermissions,
    meta: {
      title: "无权限"
    }
  },
  {
    path: "/scroll-page",
    name: "ScrollPage",
    component: ScrollPage,
    meta: {
      title: "BScroll页"
    }
  },
  {
    path: "/use-bscroll-component",
    name: "UseBScrollComponent",
    component: UseBScrollComponent,
    meta: {
      title: "使用BScroll组件"
    }
  },
  {
    // 没匹配到路由的都转跳到404
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  routes
});

// 路由导航卫士
router.beforeEach((to, from, next) => {
  // 登录权限
  if (to.meta.requireAuth) {
    if (!getTokenForStorage()) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath // fullPath为当前要访问的页面（带地址到login页，登录完再跳转）
        }
      });
    }
  }

  // 设置title
  document.title = to?.meta?.title || "vue-h5-pro";

  next();
});

// 设置本地的路由（用于设置页面切换动画）
/* const setLocalRoute = (to, from) => {
    // 本地已访问页面路由；localRoute自己构造在myVue中的
    const localRoute = window.myVue.localRoute = window.myVue.localRoute || [];
    const fromIndex = localRoute.indexOf(from.path);
    const toIndex = localRoute.indexOf(to.path);

    // 前进存储上一个历史路由
    if (fromIndex < 0) {
        localRoute.unshift(from.path);

        // 后退删除已有的路由
        if(toIndex >= 0) {
            localRoute.splice(toIndex, 1)
        }
    }
    // 最多储存5条
    if (localRoute.length > 5) {
        localRoute.splice(0, 1)
    }
}
router.afterEach((to, from) => {
    if (!(from.path === '/' && from.name === null) && from.path !== '/404' && from.path !== '/403') {
        setLocalRoute(to, from)
    }
}) */

export default router;
