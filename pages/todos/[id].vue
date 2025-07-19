<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-100">
    <div class="bg-white/90 shadow-xl rounded-xl p-8 w-full max-w-md flex flex-col gap-6 animate-fade-in">
      <h2 class="text-3xl font-bold text-yellow-700 mb-4">Edit TODO</h2>
      <form v-if="loaded" @submit.prevent="submitTodo" class="flex flex-col gap-4">
        <input v-model="form.title" type="text" class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" placeholder="Title" required />
        <textarea v-model="form.description" class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none" rows="4" placeholder="Description"></textarea>
        <div class="flex flex-col gap-4">
          <label class="flex items-center gap-3 text-lg">
            <input type="checkbox" v-model="form.completed" class="w-5 h-5" /> 
            <span class="font-semibold">Completed</span>
          </label>
          <input v-model="form.due_date" type="date" class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
          <select v-model="form.priority" class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none bg-white cursor-pointer">
            <option value="" class="text-lg py-2">Priority</option>
            <option value="low" class="text-lg py-2">Low</option>
            <option value="medium" class="text-lg py-2">Medium</option>
            <option value="high" class="text-lg py-2">High</option>
          </select>
        </div>
        <div class="flex gap-4 justify-end mt-4">
          <button type="button" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200" @click="goBack">Cancel</button>
          <button type="submit" class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200">Update</button>
        </div>
      </form>
      <div v-if="error" class="text-red-500 text-center mt-2 text-lg">{{ error }}</div>
      <div v-if="!loaded && !error" class="text-center text-gray-400 text-lg">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { unset } from 'lodash'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const error = ref('')
const loaded = ref(false)
const form = ref({
  title: '',
  description: '',
  completed: false,
  due_date: '',
  priority: ''
})
const config = useRuntimeConfig()
const apiBase = config.public.apiBaseUrl

const fetchTodo = async () => {
  error.value = ''
  loaded.value = false
  try {
    const res = await fetch(`${apiBase}/v1/todos/${route.params.id}`)
    if (!res.ok) throw new Error('Failed to fetch TODO')
    const data = await res.json()
    const todo = data.data
    form.value = {
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      due_date: todo.due_date ? todo.due_date.slice(0, 10) : '',
      priority: todo.priority || ''
    }
    loaded.value = true
  } catch (e: any) {
    error.value = e.message || 'Error loading TODO'
  }
}

const submitTodo = async () => {
  error.value = ''
  const body = { ...form.value }
  if (!body.due_date) unset(body, 'due_date');
  if (!body.priority) unset(body , 'priority');
  try {
    const res = await fetch(`${apiBase}/v1/todos/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error('Failed to update TODO')
    router.push('/todos')
  } catch (e: any) {
    error.value = e.message || 'Error updating TODO'
  }
}
const goBack = () => {
  router.push('/todos')
}
onMounted(fetchTodo)
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.7s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: none; }
}
</style> 