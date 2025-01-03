<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Habit } from '@/types'
import PageLayout from '@/components/layout/PageLayout.vue'
import HabitCard from '@/components/habits/HabitCard.vue'
import CreateHabitDialog from '@/components/habits/CreateHabitDialog.vue'
import { useHabitsStore } from '@/stores/habits'
import { toast } from '@/components/ui/toast'

const habitsStore = useHabitsStore()
const editingHabit = ref<Habit | null>(null)
const createDialogRef = ref<InstanceType<typeof CreateHabitDialog> | null>(null)

onMounted(async () => {
  try {
    await habitsStore.fetchHabits()
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error.message || 'Failed to load habits',
      variant: 'destructive',
    })
  }
})

function handleEdit(habit: Habit) {
  editingHabit.value = habit
  if (createDialogRef.value) {
    createDialogRef.value.isOpen = true
  }
}
</script>

<template>
  <PageLayout
    title="Habits"
    description="Track and manage your daily habits"
  >
    <div class="mb-6 flex items-center justify-between">
      <div>
        <p class="text-sm text-muted-foreground">
          {{ habitsStore.getHabitsCount }} habits total
        </p>
      </div>
      <CreateHabitDialog 
        ref="createDialogRef"
        :habit="editingHabit"
        @created="editingHabit = null"
        @updated="editingHabit = null"
      />
    </div>

    <div 
      v-if="habitsStore.loading && !habitsStore.habits.length" 
      class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <div v-for="i in 3" :key="i" class="h-[200px] rounded-lg bg-muted animate-pulse" />
    </div>

    <div v-else-if="habitsStore.error" class="text-center py-8">
      <p class="text-destructive">{{ habitsStore.error }}</p>
    </div>

    <div v-else-if="!habitsStore.habits.length" class="text-center py-8">
      <p class="text-muted-foreground">No habits yet. Create your first one!</p>
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <HabitCard
        v-for="habit in habitsStore.habits"
        :key="habit.id"
        :habit="habit"
        @edit="handleEdit"
      />
    </div>
  </PageLayout>
</template>
