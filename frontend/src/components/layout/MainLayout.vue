<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const router = useRouter()
const showSidebar = ref(true)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/auth/login')
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-14 items-center">
        <button @click="toggleSidebar" class="mr-2 px-2 hover:bg-accent hover:text-accent-foreground rounded-md">
          <span class="sr-only">Toggle sidebar</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div class="mr-4 hidden md:flex">
          <router-link class="mr-6 flex items-center space-x-2" to="/">
            <span class="hidden font-bold sm:inline-block">Habit Tracker</span>
          </router-link>
        </div>
        <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav class="flex items-center space-x-2">
            <ThemeToggle />
            <button
              @click="handleLogout"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>

    <div class="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside v-show="showSidebar" class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div class="h-full py-6 pl-8 pr-6 lg:py-8">
          <nav class="flex flex-col space-y-2">
            <router-link
              to="/"
              class="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              :class="{ 'bg-accent': $route.path === '/' }"
            >
              Dashboard
            </router-link>
            <router-link
              to="/habits"
              class="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              :class="{ 'bg-accent': $route.path === '/habits' }"
            >
              Habits
            </router-link>
          </nav>
        </div>
      </aside>
      <main class="flex w-full flex-col overflow-hidden">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
