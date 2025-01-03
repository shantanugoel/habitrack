&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    // TODO: Implement login logic
    localStorage.setItem('token', 'dummy-token') // Temporary for testing
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"&gt;
    &lt;div class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"&gt;
      &lt;div class="absolute inset-0 bg-zinc-900"&gt;&lt;/div&gt;
      &lt;div class="relative z-20 flex items-center text-lg font-medium"&gt;
        &lt;svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-6 w-6"&gt;&lt;path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"&gt;&lt;/path&gt;&lt;/svg&gt;
        Habit Tracker
      &lt;/div&gt;
      &lt;div class="relative z-20 mt-auto"&gt;
        &lt;blockquote class="space-y-2"&gt;
          &lt;p class="text-lg"&gt;
            "Track your habits, transform your life."
          &lt;/p&gt;
        &lt;/blockquote&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="lg:p-8"&gt;
      &lt;div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"&gt;
        &lt;div class="flex flex-col space-y-2 text-center"&gt;
          &lt;h1 class="text-2xl font-semibold tracking-tight"&gt;Welcome back&lt;/h1&gt;
          &lt;p class="text-sm text-muted-foreground"&gt;
            Enter your email to sign in to your account
          &lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="grid gap-6"&gt;
          &lt;form @submit.prevent="handleSubmit"&gt;
            &lt;div class="grid gap-4"&gt;
              &lt;div class="grid gap-2"&gt;
                &lt;label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"&gt;Email&lt;/label&gt;
                &lt;input
                  id="email"
                  v-model="email"
                  type="email"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="name@example.com"
                  required
                /&gt;
              &lt;/div&gt;
              &lt;div class="grid gap-2"&gt;
                &lt;label for="password" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"&gt;Password&lt;/label&gt;
                &lt;input
                  id="password"
                  v-model="password"
                  type="password"
                  class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  required
                /&gt;
              &lt;/div&gt;
              &lt;button
                type="submit"
                class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                :disabled="loading"
              &gt;
                {{ loading ? 'Signing in...' : 'Sign in' }}
              &lt;/button&gt;
            &lt;/div&gt;
          &lt;/form&gt;
        &lt;/div&gt;
        &lt;p class="px-8 text-center text-sm text-muted-foreground"&gt;
          &lt;router-link
            to="/auth/register"
            class="hover:text-brand underline underline-offset-4"
          &gt;
            Don't have an account? Sign up
          &lt;/router-link&gt;
        &lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
