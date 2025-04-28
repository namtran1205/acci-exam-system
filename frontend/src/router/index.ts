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
    {
      path: "/registration",
      name: "registration",
      component: () => import("../views/registration/CustomerRegistration.vue"),
    },
    {
      path: "/registration/new_customer",
      name: "new_customer",
      component: () => import("../views/registration/NewCustomer.vue"),
    },
    {
      path: "/registration/new_customer/individual",
      name: "individual",
      component: () => import("../views/registration/IndividualRegistration.vue"),
    },
  ],
});

// Change the page title on navigation.
router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || "ACCI | Undefined";
  next();
});

export default router;
