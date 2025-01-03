import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export async function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore()
  const isAuthRoute = to.matched.some(record => record.meta.requiresAuth)
  const isGuestRoute = to.matched.some(record => record.meta.guest)

  // Check authentication status if not already checked
  if (!authStore.user) {
    await authStore.checkAuth()
  }

  if (isAuthRoute && !authStore.isAuthenticated) {
    // Redirect to login if trying to access protected route while not authenticated
    next({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    })
  } else if (isGuestRoute && authStore.isAuthenticated) {
    // Redirect to dashboard if trying to access guest route while authenticated
    next({ path: '/dashboard' })
  } else {
    next()
  }
}
