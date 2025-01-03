import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware } from './middleware/auth'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import HabitsView from '@/views/HabitsView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/habits',
      name: 'habits',
      component: HabitsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true }
    }
  ]
})

// Register global navigation guard
router.beforeEach(authMiddleware)

export default router
