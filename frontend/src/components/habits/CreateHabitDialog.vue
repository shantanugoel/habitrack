<script setup lang="ts">
import { ref } from 'vue'
import type { Habit, HabitFormData } from '@/types'
import { useHabitsStore } from '@/stores/habits'
import { toast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const props = defineProps<{
  habit?: Habit
}>()

const emit = defineEmits<{
  (e: 'created', habit: Habit): void
  (e: 'updated', habit: Habit): void
}>()

const isOpen = ref(false)
const isSubmitting = ref(false)

const formSchema = toTypedSchema(z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  target: z.string().max(100, 'Target is too long').optional(),
  notes: z.string().max(500, 'Notes are too long').optional(),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: props.habit?.name ?? '',
    target: props.habit?.target ?? '',
    notes: props.habit?.notes ?? '',
  },
})

const habitsStore = useHabitsStore()

async function onSubmit(values: HabitFormData) {
  isSubmitting.value = true
  try {
    if (props.habit) {
      const updatedHabit = await habitsStore.updateHabit(props.habit.id, values)
      emit('updated', updatedHabit)
      toast({
        title: 'Success',
        description: 'Habit updated successfully',
      })
    } else {
      const newHabit = await habitsStore.createHabit(values)
      emit('created', newHabit)
      toast({
        title: 'Success',
        description: 'Habit created successfully',
      })
    }
    isOpen.value = false
    form.resetForm()
  } catch (error: any) {
    toast({
      title: 'Error',
      description: error.message || 'Failed to save habit',
      variant: 'destructive',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger asChild v-if="!habit">
      <Button>
        <Plus class="mr-2 h-4 w-4" />
        New Habit
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ habit ? 'Edit' : 'Create' }} Habit</DialogTitle>
        <DialogDescription>
          {{ habit ? 'Update your habit details below.' : 'Add a new habit to track.' }}
        </DialogDescription>
      </DialogHeader>
      <Form @submit="onSubmit" :form="form">
        <div class="grid gap-4 py-4">
          <FormField name="name" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Exercise daily" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="target" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Target (Optional)</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="30 minutes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="notes" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  v-bind="componentField"
                  placeholder="Any additional details about your habit"
                  class="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            :disabled="isSubmitting"
          >
            {{ habit ? 'Update' : 'Create' }}
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>
