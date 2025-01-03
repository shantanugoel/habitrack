&lt;script setup lang="ts"&gt;
defineProps<{
  title?: string
  description?: string
}>()
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="flex flex-col gap-4 p-4 md:gap-8 md:p-10"&gt;
    &lt;div class="flex flex-col gap-2"&gt;
      &lt;h1 v-if="title" class="text-3xl font-bold tracking-tight"&gt;{{ title }}&lt;/h1&gt;
      &lt;p v-if="description" class="text-muted-foreground"&gt;{{ description }}&lt;/p&gt;
    &lt;/div&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/div&gt;
&lt;/template&gt;
