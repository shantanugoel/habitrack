<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errors = ref<Record<string, string>>({})
const loginError = ref<string | null>(null)
const loading = ref(false)

const validateForm = () => {
  errors.value = {}
  loginError.value = null
  
  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (!password.value) {
    errors.value.password = 'Password is required'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  loginError.value = null
  
  const success = await authStore.login(email.value, password.value)
  loading.value = false
  
  if (success) {
    const redirectPath = route.query.redirect as string || '/dashboard'
    router.push(redirectPath)
  } else {
    loginError.value = authStore.error || 'Failed to login. Check your email if you have not verified your account yet.'
  }
}
</script>

<template>
  <div class="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div class="absolute inset-0 bg-zinc-900"></div>
      <div class="relative z-20 flex items-center text-lg font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-6 w-6">
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
        </svg>
        Habit Tracker
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            "Track your habits, transform your life."
          </p>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p class="text-sm text-muted-foreground">
            Enter your credentials to sign in
          </p>
        </div>

        <div v-if="loginError" class="p-3 rounded-md bg-destructive/15 text-destructive text-sm">
          {{ loginError }}
        </div>

        <div class="grid gap-6">
          <form @submit.prevent="handleSubmit" novalidate>
            <div class="grid gap-4">
              <div class="grid gap-2">
                <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive': errors.email }"
                  placeholder="name@example.com"
                  required
                />
                <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
              </div>
              <div class="grid gap-2">
                <label for="password" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive': errors.password }"
                  required
                />
                <p v-if="errors.password" class="text-sm text-destructive">{{ errors.password }}</p>
              </div>
              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                :disabled="loading"
              >
                {{ loading ? 'Signing in...' : 'Sign in' }}
              </button>
            </div>
          </form>
        </div>
        <p class="px-8 text-center text-sm text-muted-foreground">
          <router-link
            to="/auth/register"
            class="hover:text-brand underline underline-offset-4"
          >
            Don't have an account? Sign up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
