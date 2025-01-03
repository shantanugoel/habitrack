<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
</script>

<template>
  <PageLayout
    title="Dashboard"
    description="Welcome to your habit tracking dashboard"
  >
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="tracking-tight text-sm font-medium">Total Habits</h3>
        </div>
        <div class="text-2xl font-bold">0</div>
      </div>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="tracking-tight text-sm font-medium">Completed Today</h3>
        </div>
        <div class="text-2xl font-bold">0/0</div>
      </div>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="tracking-tight text-sm font-medium">Current Streak</h3>
        </div>
        <div class="text-2xl font-bold">0 days</div>
      </div>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="tracking-tight text-sm font-medium">Completion Rate</h3>
        </div>
        <div class="text-2xl font-bold">0%</div>
      </div>
    </div>
  </PageLayout>
</template>
