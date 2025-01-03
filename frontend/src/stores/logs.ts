import { defineStore } from 'pinia'
import type { HabitLog, LogFormData } from '@/types'
import { api } from '@/lib/api'

interface LogsState {
  logs: Record<number, HabitLog[]>
  loading: boolean
  error: string | null
}

export const useLogsStore = defineStore('logs', {
  state: (): LogsState => ({
    logs: {},
    loading: false,
    error: null
  }),

  getters: {
    getLogsByHabitId: (state) => (habitId: number) => state.logs[habitId] || [],
    
    getLogsByDate: (state) => (date: string) => {
      const allLogs: HabitLog[] = []
      Object.values(state.logs).forEach(habitLogs => {
        allLogs.push(...habitLogs.filter(log => log.date === date))
      })
      return allLogs
    }
  },

  actions: {
    async fetchLogsByHabitId(habitId: number) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.get(`/habits/${habitId}/logs`)
        this.logs[habitId] = data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch logs'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createLog(habitId: number, logData: LogFormData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.post(`/habits/${habitId}/logs`, logData)
        if (!this.logs[habitId]) {
          this.logs[habitId] = []
        }
        this.logs[habitId].push(data)
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create log'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateLog(habitId: number, logId: number, logData: LogFormData) {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.put(`/habits/${habitId}/logs/${logId}`, logData)
        const logs = this.logs[habitId]
        if (logs) {
          const index = logs.findIndex(l => l.id === logId)
          if (index !== -1) {
            logs[index] = data
          }
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update log'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteLog(habitId: number, logId: number) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/habits/${habitId}/logs/${logId}`)
        const logs = this.logs[habitId]
        if (logs) {
          this.logs[habitId] = logs.filter(l => l.id !== logId)
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to delete log'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
