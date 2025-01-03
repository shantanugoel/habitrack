import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/lib/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => {
    console.log('Auth state:', { token: token.value, user: user.value })
    return !!token.value && !!user.value
  })

  const setToken = (newToken: string | null) => {
    console.log('Setting token:', newToken)
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const setUser = (newUser: any | null) => {
    console.log('Setting user:', newUser)
    user.value = newUser
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    console.log('Attempting login...')
    const response = await api.post('/auth/login', { email, password }).catch(err => {
      console.error('Login error:', err)
      error.value = err.response?.data?.message || 'Failed to login. Check your email if you have not verified your account yet.'
      return null
    })

    loading.value = false

    if (!response) {
      console.log('No response from login')
      return false
    }

    console.log('Login response:', response.data)

    if (!response.data.is_verified) {
      error.value = 'Please verify your email before logging in'
      return false
    }

    // Get user info immediately after successful login
    try {
      setToken(response.data.token)
      const userResponse = await api.get('/auth/current')
      console.log('User response:', userResponse.data)
      setUser(userResponse.data)
    } catch (err) {
      console.error('Failed to get user info after login:', err)
      error.value = 'Failed to get user information'
      return false
    }

    console.log('Login successful, auth state:', { token: token.value, user: user.value })
    return true
  }

  const register = async (name: string, email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      await api.post('/auth/register', { name, email, password })
      return true // Registration successful
    } catch (err: any) {
      console.log('Registration error:', err)
      error.value = err.response?.data?.message || 'Failed to register'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const verify = async (token: string) => {
    loading.value = true
    error.value = null
    try {
      await api.post('/auth/verify', { token })
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to verify email'
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
    const storedToken = localStorage.getItem('token')
    if (storedToken && !user.value) {
      try {
        const response = await api.get('/auth/current')
        setUser(response.data)
      } catch (err) {
        console.error('Failed to get user info:', err)
        logout()
      }
    }
  }

  // Initialize
  checkAuth()

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    verify,
    logout,
    checkAuth
  }
})
