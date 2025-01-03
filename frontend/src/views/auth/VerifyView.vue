<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const verifying = ref(false)
const verified = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  const token = route.hash.slice(1) // Remove the # from the hash
  if (!token) {
    error.value = 'No verification token provided'
    return
  }

  verifying.value = true
  try {
    await authStore.verify(token)
    verified.value = true
    setTimeout(() => {
      router.push('/auth/login')
    }, 3000) // Redirect to login after 3 seconds
  } catch (err) {
    error.value = 'Failed to verify email. The link may be expired or invalid.'
  } finally {
    verifying.value = false
  }
})
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
            "Verify your email to start tracking your habits."
          </p>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Email Verification</h1>
          <p class="text-sm text-muted-foreground">
            {{ verifying ? 'Verifying your email...' : verified ? 'Email verified successfully!' : 'Checking verification status' }}
          </p>
        </div>

        <div v-if="error" class="p-3 rounded-md bg-destructive/15 text-destructive text-sm">
          {{ error }}
        </div>

        <div v-if="verified" class="p-3 rounded-md bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm">
          Your email has been verified successfully! You will be redirected to login...
        </div>

        <div v-if="verifying" class="flex justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  </div>
</template>
