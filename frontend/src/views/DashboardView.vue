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
        <p class="text-xs text-muted-foreground">
          Active habits you're tracking
        </p>
      </div>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="tracking-tight text-sm font-medium">Completion Rate</h3>
        </div>
        <div class="text-2xl font-bold">0%</div>
        <p class="text-xs text-muted-foreground">
          Average completion rate this week
        </p>
      </div>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="tracking-tight text-sm font-medium">Streak</h3>
        </div>
        <div class="text-2xl font-bold">0</div>
        <p class="text-xs text-muted-foreground">
          Your current streak
        </p>
      </div>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="tracking-tight text-sm font-medium">Points</h3>
        </div>
        <div class="text-2xl font-bold">0</div>
        <p class="text-xs text-muted-foreground">
          Total points earned
        </p>
      </div>
    </div>

    <div class="mt-6 space-y-4">
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="p-6">
          <h3 class="text-lg font-medium">Recent Activity</h3>
          <p class="text-sm text-muted-foreground">
            Your habit completion history for the past week
          </p>
        </div>
        <div class="p-6">
          <!-- Activity chart will go here -->
          <div class="flex items-center justify-center h-48 bg-muted/10 rounded-md">
            <p class="text-sm text-muted-foreground">No activity data yet</p>
          </div>
        </div>
      </div>

      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="p-6">
          <h3 class="text-lg font-medium">Today's Habits</h3>
          <p class="text-sm text-muted-foreground">
            Track your habits for today
          </p>
        </div>
        <div class="p-6">
          <!-- Habits list will go here -->
          <div class="flex items-center justify-center h-32 bg-muted/10 rounded-md">
            <p class="text-sm text-muted-foreground">No habits added yet</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
