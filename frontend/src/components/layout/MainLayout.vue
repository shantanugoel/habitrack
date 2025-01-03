&lt;script setup lang="ts"&gt;
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
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="min-h-screen bg-background"&gt;
    &lt;header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"&gt;
      &lt;div class="container flex h-14 items-center"&gt;
        &lt;button @click="toggleSidebar" class="mr-2 px-2 hover:bg-accent hover:text-accent-foreground rounded-md"&gt;
          &lt;span class="sr-only"&gt;Toggle sidebar&lt;/span&gt;
          &lt;svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"&gt;
            &lt;line x1="3" y1="12" x2="21" y2="12"&gt;&lt;/line&gt;
            &lt;line x1="3" y1="6" x2="21" y2="6"&gt;&lt;/line&gt;
            &lt;line x1="3" y1="18" x2="21" y2="18"&gt;&lt;/line&gt;
          &lt;/svg&gt;
        &lt;/button&gt;
        &lt;div class="mr-4 hidden md:flex"&gt;
          &lt;router-link class="mr-6 flex items-center space-x-2" to="/"&gt;
            &lt;span class="hidden font-bold sm:inline-block"&gt;Habit Tracker&lt;/span&gt;
          &lt;/router-link&gt;
        &lt;/div&gt;
        &lt;div class="flex flex-1 items-center justify-between space-x-2 md:justify-end"&gt;
          &lt;nav class="flex items-center space-x-2"&gt;
            &lt;ThemeToggle /&gt;
            &lt;button
              @click="handleLogout"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            &gt;
              Logout
            &lt;/button&gt;
          &lt;/nav&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/header&gt;

    &lt;div class="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"&gt;
      &lt;aside v-show="showSidebar" class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block"&gt;
        &lt;div class="h-full py-6 pl-8 pr-6 lg:py-8"&gt;
          &lt;nav class="flex flex-col space-y-2"&gt;
            &lt;router-link
              to="/"
              class="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              :class="{ 'bg-accent': $route.path === '/' }"
            &gt;
              Dashboard
            &lt;/router-link&gt;
            &lt;router-link
              to="/habits"
              class="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              :class="{ 'bg-accent': $route.path === '/habits' }"
            &gt;
              Habits
            &lt;/router-link&gt;
          &lt;/nav&gt;
        &lt;/div&gt;
      &lt;/aside&gt;
      &lt;main class="flex w-full flex-col overflow-hidden"&gt;
        &lt;slot&gt;&lt;/slot&gt;
      &lt;/main&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
