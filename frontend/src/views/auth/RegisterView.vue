<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const errors = ref<Record<string, string>>({})

const validateForm = () => {
  errors.value = {}
  
  if (!name.value) {
    errors.value.name = 'Name is required'
  } else if (name.value.length < 2) {
    errors.value.name = 'Name must be at least 2 characters'
  }
  
  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    await authStore.register(name.value, email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    // Error is already handled in the store
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
            "Start your journey to better habits today."
          </p>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p class="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>

        <div v-if="authStore.error" class="p-3 rounded-md bg-destructive/15 text-destructive text-sm">
          {{ authStore.error }}
        </div>

        <div class="grid gap-6">
          <form @submit.prevent="handleSubmit">
            <div class="grid gap-4">
              <div class="grid gap-2">
                <label for="name" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Name
                </label>
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  :class="{ 'border-destructive': errors.name }"
                  placeholder="John Doe"
                  required
                />
                <p v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</p>
              </div>
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
                :disabled="authStore.loading"
              >
                {{ authStore.loading ? 'Creating account...' : 'Create account' }}
              </button>
            </div>
          </form>
        </div>
        <p class="px-8 text-center text-sm text-muted-foreground">
          <router-link
            to="/auth/login"
            class="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
