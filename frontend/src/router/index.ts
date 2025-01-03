import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            title: 'Dashboard',
            requiresAuth: true
          }
        },
        {
          path: '/habits',
          name: 'habits',
          component: () => import('@/views/HabitsView.vue'),
          meta: {
            title: 'Habits',
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: {
            title: 'Login'
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
          meta: {
            title: 'Register'
          }
        }
      ]
    }
  ]
})

// Navigation guard for auth
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = !!localStorage.getItem('token') // We'll implement proper auth later

  if (requiresAuth && !isAuthenticated) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
