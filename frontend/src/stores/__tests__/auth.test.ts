import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'
import { api } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  api: {
    post: vi.fn(),
    get: vi.fn()
  }
}))

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('successfully logs in user', async () => {
      const store = useAuthStore()
      const mockResponse = {
        data: {
          token: 'mock-token',
          user: { id: 1, email: 'test@example.com', name: 'Test User' }
        }
      }
      
      vi.mocked(api.post).mockResolvedValueOnce(mockResponse)

      await store.login({ email: 'test@example.com', password: 'password' })

      expect(store.token).toBe('mock-token')
      expect(store.user).toEqual(mockResponse.data.user)
      expect(localStorage.getItem('token')).toBe('mock-token')
      expect(store.error).toBeNull()
    })

    it('handles login error', async () => {
      const store = useAuthStore()
      const mockError = {
        response: {
          data: {
            message: 'Invalid credentials'
          }
        }
      }

      vi.mocked(api.post).mockRejectedValueOnce(mockError)

      await expect(
        store.login({ email: 'test@example.com', password: 'wrong' })
      ).rejects.toEqual(mockError)

      expect(store.token).toBeNull()
      expect(store.user).toBeNull()
      expect(store.error).toBe('Invalid credentials')
    })
  })

  describe('logout', () => {
    it('successfully logs out user', async () => {
      const store = useAuthStore()
      store.$patch({
        token: 'mock-token',
        user: { id: 1, email: 'test@example.com', name: 'Test User' }
      })
      localStorage.setItem('token', 'mock-token')

      vi.mocked(api.post).mockResolvedValueOnce({})

      await store.logout()

      expect(store.token).toBeNull()
      expect(store.user).toBeNull()
      expect(localStorage.getItem('token')).toBeNull()
    })
  })
})
