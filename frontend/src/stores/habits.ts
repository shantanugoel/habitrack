import { defineStore } from 'pinia'
import type { Habit, HabitFormData } from '@/types'
import { api } from '@/lib/api'

interface HabitsState {
  habits: Habit[]
  currentHabit: Habit | null
  loading: boolean
  error: string | null
}

export const useHabitsStore = defineStore('habits', {
  state: (): HabitsState => ({
    habits: [],
    currentHabit: null,
    loading: false,
    error: null
  }),

  getters: {
    getHabitById: (state) => (id: number) => 
      state.habits.find(habit => habit.id === id),
    
    getHabitsCount: (state) => state.habits.length
  },

  actions: {
    async fetchHabits() {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.get('/habits')
        this.habits = data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch habits'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createHabit(habitData: HabitFormData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post('/habits', habitData)
        this.habits.push(data)
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create habit'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateHabit(id: number, habitData: HabitFormData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.put(`/habits/${id}`, habitData)
        const index = this.habits.findIndex(h => h.id === id)
        if (index !== -1) {
          this.habits[index] = data
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update habit'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteHabit(id: number) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/habits/${id}`)
        this.habits = this.habits.filter(h => h.id !== id)
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to delete habit'
        throw error
      } finally {
        this.loading = false
      }
    },

    setCurrentHabit(habit: Habit | null) {
      this.currentHabit = habit
    }
  }
})
