import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
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
      path: "/enrollments/certificate",
      name: "Add Certificate",
      component: () => import("../views/enrollments/EnrollmentCertificateView.vue"),
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
      path: "/exams/edit",
      name: "Edit Exam Registration",
      component: () => import("../views/exams/EditExamRegistration.vue"),
    },
    {
      path: "/exams/new/participant",
      name: "New Participant",
      component: () => import("../views/exams/NewParticipant.vue"),
    },
    {
      path: "/exams/new/participant/edit",
      name: "Edit Participant",
      component: () => import("../views/exams/EditParticipant.vue"),
    },
    {
      path: "/exams/new/customer",
      name: "Pick a Customer",
      component: () => import("../views/exams/CustomerSelect.vue"),
    },
    {
      path: "/schedules",
      name: "Exam Schedules",
      component: () => import("../views/schedule/ScheduleListView.vue"),
    },
    {
      path: "/schedules/new",
      name: "New Schedule",
      component: () => import("../views/schedule/NewScheduleView.vue"),
    },
    {
      path: "/schedules/edit",
      name: "Edit Schedule",
      component: () => import("../views/schedule/EditScheduleView.vue"),
    },
    {
      path: "/certificates",
      name: "Certificates",
      component: () => import("../views/certificates/CertificateList.vue"),
    },
    {
      path: "/certificates/:id",
      name: "certificate-details",
      component: () => import("../views/certificates/CertificateDetails.vue"),
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Not found",
      component: NotFoundView,
    },
  ],
});

// Change the page title on navigation.
router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || "Undefined";
  next();
});

export default router;
