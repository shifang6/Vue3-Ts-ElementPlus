import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import( "@/views/HomeView.vue"),
    children: [
      {
        path: "/goods_lists",
        name: "goods_lists",
        meta: {
          title: "商品列表",
          showStatus: true
        },
        component: () =>
          import( "@/views/GoodsList.vue")
      },
      {
        path: "/user_lists",
        name: "user_lists",
        meta: {
          title: "用户列表",
          showStatus: true
        },
        component: () =>
          import( "@/views/UserList.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import( "@/views/Login.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
