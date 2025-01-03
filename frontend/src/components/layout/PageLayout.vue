<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-4 p-4 md:gap-8 md:p-10">
    <div class="flex flex-col gap-2">
      <h1 v-if="title" class="text-3xl font-bold tracking-tight">{{ title }}</h1>
      <p v-if="description" class="text-muted-foreground">{{ description }}</p>
    </div>
    <slot></slot>
  </div>
</template>
