import { defineStore } from 'pinia'
import type { User, LoginCredentials, RegisterData } from '@/types'
import { api } from '@/lib/api'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post('/auth/login', credentials)
        this.token = data.token
        this.user = data.user
        localStorage.setItem('token', data.token)
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(data: RegisterData) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/auth/register', data)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', response.data.token)
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Registration failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await api.post('/auth/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
      }
    },

    async fetchUser() {
      if (!this.token) return

      this.loading = true
      try {
        const { data } = await api.get('/auth/me')
        this.user = data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch user'
        this.token = null
        this.user = null
        localStorage.removeItem('token')
      } finally {
        this.loading = false
      }
    }
  }
})
