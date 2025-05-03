import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/enrollments",
      name: "Enrollments",
      component: () => import("../views/enrollments/EnrollmentView.vue"),
    },
    {
      path: "/enrollments/details",
      name: "Enrollment Details",
      component: () => import("../views/enrollments/EnrollmentDetailView.vue"),
    },
    {
      path: "/enrollments/extend",
      name: "Extend an Enrollment",
      component: () => import("../views/extensions/AddExtensionView.vue"),
    },
    {
      path: "/customers",
      name: "Customers Registration",
      component: () => import("../views/customers/CustomerRegistrationView.vue"),
    },
    {
      path: "/customers/new",
      name: "New Customer",
      component: () => import("../views/customers/NewCustomerView.vue"),
    },
    {
      path: "/customers/new/individual",
      name: "New Individual",
      component: () => import("../views/customers/NewIndividualView.vue"),
    },
    {
      path: "/customers/edit",
      name: "Edit Individual",
      component: () => import("../views/registration/EditIndividual.vue"),
    },
    {
      path: "/exams",
      name: "Exams Registration",
      component: () => import("../views/exams/ExamRegistrationView.vue"),
    },
    {
      path: "/exams/new",
      name: "New Exam Registration",
      component: () => import("../views/exams/NewExamRegistration.vue"),
    },
    {
      path: "/exams/new/customer",
      name: "Pick a Customer",
      component: () => import("../views/exams/CustomerSelect.vue"),
    },
    {
      path: "/exams/new/participant",
      name: "New Participant",
      component: () => import("../views/exams/NewParticipant.vue"),
    },
    {
      path: "/exams/new/participant/edit/:id",
      name: "Edit Participant",
      component: () => import("../views/exams/EditParticipant.vue"),
    },
    {
      path: "/exams/schedules",
      name: "Examination Scheduling",
      component: () => import("../views/exams/ExaminationScheduling.vue"),
    }
  ],
});

// Change the page title on navigation.
router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || "Undefined";
  next();
});

export default router;
