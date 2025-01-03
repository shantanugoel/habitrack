&lt;script setup lang="ts"&gt;
import { ref, onMounted } from 'vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', theme.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light'
  theme.value = savedTheme
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  }
})
&lt;/script&gt;

&lt;template&gt;
  &lt;button
    @click="toggleTheme"
    class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9"
  &gt;
    &lt;span class="sr-only"&gt;Toggle theme&lt;/span&gt;
    &lt;svg
      v-if="theme === 'light'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-[1.2rem] w-[1.2rem]"
    &gt;
      &lt;circle cx="12" cy="12" r="4"&gt;&lt;/circle&gt;
      &lt;path d="M12 2v2"&gt;&lt;/path&gt;
      &lt;path d="M12 20v2"&gt;&lt;/path&gt;
      &lt;path d="m4.93 4.93 1.41 1.41"&gt;&lt;/path&gt;
      &lt;path d="m17.66 17.66 1.41 1.41"&gt;&lt;/path&gt;
      &lt;path d="M2 12h2"&gt;&lt;/path&gt;
      &lt;path d="M20 12h2"&gt;&lt;/path&gt;
      &lt;path d="m6.34 17.66-1.41 1.41"&gt;&lt;/path&gt;
      &lt;path d="m19.07 4.93-1.41 1.41"&gt;&lt;/path&gt;
    &lt;/svg&gt;
    &lt;svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-[1.2rem] w-[1.2rem]"
    &gt;
      &lt;path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"&gt;&lt;/path&gt;
    &lt;/svg&gt;
  &lt;/button&gt;
&lt;/template&gt;
