import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import App from '../App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/registration/CustomerRegistration.vue'),
    },
    {
      path: "/registration/new_customer",
      name: "new_customer",
      component: () => import('../views/registration/NewCustomer.vue'),
    },
    {
      path: "/registration/new_customer/individual",
      name: "individual",
      component: () => import('../views/registration/IndividualRegistration.vue'),
    },
  ],
})

export default router
