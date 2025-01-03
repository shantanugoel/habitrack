// User types
export interface User {
  id: number
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
}

// Habit types
export interface Habit {
  id: number
  user_id: number
  name: string
  target?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface HabitFormData {
  name: string
  target?: string
  notes?: string
}

// Log types
export interface HabitLog {
  id: number
  habit_id: number
  date: string
  done: boolean
  notes?: string
  created_at: string
  updated_at: string
}

export interface LogFormData {
  date: string
  done: boolean
  notes?: string
}
