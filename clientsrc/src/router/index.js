import Vue from 'vue';
import VueRouter from 'vue-router';
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

function loadView(path) {
  return () => import("../views/" + path);
}

/* Adding new routes here .. Jake's fancy stuff, really can just do add routes here */
export const dashboardRoutes = [
  {
    path: "boards",
    name: "Dashboard.Boards",
    displayName: "Boards",
    component: loadView("Boards.vue")
  },
  {
    path: "",
    name: "Dashboard.Profile",
    displayName: "Profile",
    component: loadView("Profile.vue")
  }];

/* this is how we add things to the navigator */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView("Home.vue")
  },
  {
    path: "/boards/:boardId",
    name: "Board",
    beforeEnter: authGuard,
    component: loadView("Board.vue")
  },
  {
    path: '/dashboard',
    beforeEnter: authGuard,
    component: loadView("Dashboard.vue"),
    children: [
      ...dashboardRoutes
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;