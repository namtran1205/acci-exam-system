import LoginView from "@/views/LoginView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ACCI | Login",
      component: LoginView,
    },
  ],
});

// Change the page title on navigation.
router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || "ACCI | Undefined";
  next();
});

export default router;
