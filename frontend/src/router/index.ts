import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DashboardView from '@/views/DashboardView.vue'
import HabitsView from '@/views/HabitsView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import VerifyView from '@/views/auth/VerifyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
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
    },
    {
      path: '/auth/verify',
      name: 'verify',
      component: VerifyView,
      meta: { guest: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  // Check authentication status
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Save the intended destination
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // Prevent authenticated users from accessing guest routes
  if (to.meta.guest && isAuthenticated) {
    next({ name: 'dashboard' })
    return
  }

  next()
})

export default router
