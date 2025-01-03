<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // If user is logged in, redirect to dashboard
  if (localStorage.getItem('token')) {
    router.push('/dashboard')
  } else {
    router.push('/auth/login')
  }
})
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-4xl font-bold">Habit Tracker</h1>
      <p class="mt-2 text-muted-foreground">Redirecting...</p>
    </div>
  </div>
</template>
