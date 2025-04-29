import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import App from "../App.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/registration",
      name: "registration",
      component: () => import("../views/registration/CustomerRegistration_.vue"),
    },
    {
      path: "/",
      name: "ACCI | Login",
      component: LoginView,
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
    {
      path: "/registration/edit/:id",
      name: "individual_edit",
      component: () => import("../views/registration/EditIndividual.vue"),
      //props: true,
    },
  ],
});

// Change the page title on navigation.
router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || "ACCI | Undefined";
  next();
});

export default router;
