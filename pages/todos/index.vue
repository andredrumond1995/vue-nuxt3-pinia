<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
    <div class="bg-white/90 shadow-xl rounded-xl p-8 w-full max-w-4xl flex flex-col gap-6 animate-fade-in">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-3xl font-bold text-purple-700">Hello, {{ userName }}!</h2>
          <p class="text-gray-500 text-lg">
            Your TODOs 
            <span v-if="totalItems > 0" class="text-purple-600 font-semibold">({{ totalItems }} total)</span>
          </p>
        </div>
        <button @click="goBack" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg text-lg transition-colors duration-200">Change Name</button>
      </div>
      
      <!-- Search Filter -->
      <div class="flex gap-4 items-center">
        <div class="flex-1">
          <input 
            v-model="searchTerm" 
            @input="debouncedSearch"
            type="text" 
            placeholder="Search by title..." 
            class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button @click="goToNew" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200 whitespace-nowrap">+ New TODO</button>
      </div>

      <div>
        <div v-if="loading" class="text-center text-gray-400 text-lg">Loading...</div>
        <div v-else-if="todos.length === 0" class="text-center text-gray-400 text-lg">
          {{ searchTerm ? 'No TODOs found matching your search.' : 'No TODOs found.' }}
        </div>
        <ul v-else class="flex flex-col gap-4">
          <li v-for="todo in todos" :key="todo._id" class="bg-white rounded-lg shadow p-6 flex items-center justify-between hover:scale-[1.01] transition-transform">
            <div>
              <h3 class="font-semibold text-xl mb-2">{{ todo.title }}</h3>
              <p class="text-gray-500 text-base mb-1">{{ todo.description }}</p>
              <div class="flex items-center gap-2">
                <span v-if="todo.due_date" class="text-blue-500 text-base">Due: {{ formatDate(todo.due_date) }}</span>
                <span v-if="todo.priority" class="text-base font-bold" :class="priorityClass(todo.priority)">{{ todo.priority }}</span>
              </div>
            </div>
            <div class="flex gap-3">
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-base transition-colors duration-200" @click="goToEdit(todo._id)">Edit</button>
              <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-base transition-colors duration-200" @click="deleteTodo(todo._id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Pagination -->
      <div class="flex flex-col items-center gap-4 mt-6">
        <div class="text-gray-600 text-lg">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, totalItems) }} of {{ totalItems }} TODOs
        </div>
        
        <div class="flex justify-center items-center gap-4">
          <button 
            @click="goToPage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="px-4 py-2 text-lg font-bold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-purple-600 hover:bg-purple-700 text-white'"
          >
            Previous
          </button>
          
          <div class="flex gap-2">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="goToPage(page)"
              class="px-4 py-2 text-lg font-bold rounded-lg transition-colors duration-200"
              :class="page === currentPage ? 'bg-purple-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="goToPage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-lg font-bold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-purple-600 hover:bg-purple-700 text-white'"
          >
            Next
          </button>
        </div>
      </div>

      <div v-if="error" class="text-red-500 text-center mt-2 text-lg">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../../stores/user'

interface Todo {
  _id: string
  title: string
  description?: string
  completed: boolean
  due_date?: string
  priority?: 'low' | 'medium' | 'high'
  is_deleted?: boolean
  created_at?: string
  updated_at?: string
}

interface TodoResponse {
  success: boolean
  datetime: string
  httpMethod: string
  path: string
  data: {
    totalItems: number
    currentPage: number
    totalPageItems: number
    totalPages: number
    top: number
    skip: number
    items: Todo[]
  }
}

const userStore = useUserStore()
const userName = ref('')

const todos = ref<Todo[]>([])
const loading = ref(false)
const error = ref('')
const searchTerm = ref('')
const currentPage = ref(1)
const totalItems = ref(0)
const itemsPerPage = 5

const config = useRuntimeConfig()
const apiBase = config.public.apiBaseUrl

// Debounced search
let searchTimeout: NodeJS.Timeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchTodos()
  }, 300)
}

const fetchTodos = async () => {
  loading.value = true
  error.value = ''
  try {
    const params = new URLSearchParams()
    params.append('$skip', ((currentPage.value - 1) * itemsPerPage).toString())
    params.append('$top', itemsPerPage.toString())
    
    if (searchTerm.value.trim()) {
      params.append('$filter', `contains('title', '${searchTerm.value.trim()}')`)
    }
    
    const res = await fetch(`${apiBase}/v1/todos?${params.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch TODOs')
    const data: TodoResponse = await res.json()
    todos.value = data.data?.items || []
    totalItems.value = data.data?.totalItems || 0
  } catch (e: any) {
    error.value = e.message || 'Error loading TODOs'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  navigateTo('/')
}

const goToNew = () => {
  navigateTo('/todos/new')
}

const goToEdit = (id: string) => {
  navigateTo(`/todos/${id}`)
}

const deleteTodo = async (id: string) => {
  error.value = ''
  try {
    const res = await fetch(`${apiBase}/v1/todos/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!res.ok) throw new Error('Failed to delete TODO')
    await fetchTodos()
  } catch (e: any) {
    error.value = e.message || 'Error deleting TODO'
  }
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchTodos()
  }
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString()
}

const priorityClass = (priority: string) => {
  return {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-red-500'
  }[priority] || ''
}

// Computed properties
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages.value, start + maxVisible - 1)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

onMounted(() => {
  userStore.loadName()
  userName.value = userStore.name
  fetchTodos()
})
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