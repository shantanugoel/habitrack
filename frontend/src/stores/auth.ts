import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/lib/api'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    } else {
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
  }

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/auth/login', { email, password })
      setToken(response.data.token)
      setUser(response.data.user)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to login'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const register = async (name: string, email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/auth/register', { name, email, password })
      setToken(response.data.token)
      setUser(response.data.user)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to register'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const checkAuth = async () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
      try {
        const response = await api.get('/auth/me')
        setUser(response.data.user)
      } catch (err) {
        logout()
      }
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  }
})
