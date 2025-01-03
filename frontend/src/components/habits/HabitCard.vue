<script setup lang="ts">
import { ref } from 'vue'
import type { Habit } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useHabitsStore } from '@/stores/habits'
import { toast } from '@/components/ui/toast'
import { MoreVertical, Edit, Trash2 } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps<{
  habit: Habit
}>()

const emit = defineEmits<{
  (e: 'edit', habit: Habit): void
}>()

const habitsStore = useHabitsStore()
const isDeleting = ref(false)

async function handleDelete() {
  if (!confirm('Are you sure you want to delete this habit?')) return
  
  isDeleting.value = true
  try {
    await habitsStore.deleteHabit(props.habit.id)
    toast({
      title: 'Success',
      description: 'Habit deleted successfully',
    })
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error.message || 'Failed to delete habit',
      variant: 'destructive',
    })
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <Card class="overflow-hidden">
    <CardHeader>
      <div class="flex items-start justify-between space-x-4">
        <div class="space-y-1">
          <CardTitle>{{ habit.name }}</CardTitle>
          <CardDescription v-if="habit.target">
            Target: {{ habit.target }}
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical class="h-4 w-4" />
              <span class="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="emit('edit', habit)">
              <Edit class="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              class="text-destructive focus:text-destructive" 
              :disabled="isDeleting"
              @click="handleDelete"
            >
              <Trash2 class="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent v-if="habit.notes">
      <p class="text-sm text-muted-foreground">{{ habit.notes }}</p>
    </CardContent>
    <CardFooter class="bg-muted/50 p-3">
      <p class="text-xs text-muted-foreground">
        Created {{ new Date(habit.created_at).toLocaleDateString() }}
      </p>
    </CardFooter>
  </Card>
</template>
