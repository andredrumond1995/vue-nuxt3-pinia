import { ref } from 'vue'

export interface Todo {
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

export function useTodos() {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref('')
  const apiBase = 'http://localhost:3000'

  async function fetchTodos() {
    loading.value = true
    error.value = ''
    try {
      const res = await fetch(`${apiBase}/v1/todos`)
      if (!res.ok) throw new Error('Failed to fetch TODOs')
      const data = await res.json()
      todos.value = data.data?.items || []
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error loading TODOs'
    } finally {
      loading.value = false
    }
  }

  async function getTodo(id: string) {
    error.value = ''
    try {
      const res = await fetch(`${apiBase}/v1/todos/${id}`)
      if (!res.ok) throw new Error('Failed to fetch TODO')
      const data = await res.json()
      return data.data as Todo
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error loading TODO'
      return null
    }
  }

  async function createTodo(todo: Omit<Todo, '_id' | 'created_at' | 'updated_at' | 'is_deleted'>) {
    error.value = ''
    try {
      const res = await fetch(`${apiBase}/v1/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      })
      if (!res.ok) throw new Error('Failed to create TODO')
      await fetchTodos()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error creating TODO'
    }
  }

  async function updateTodo(id: string, todo: Partial<Todo>) {
    error.value = ''
    try {
      const res = await fetch(`${apiBase}/v1/todos/${id}` , {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      })
      if (!res.ok) throw new Error('Failed to update TODO')
      await fetchTodos()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error updating TODO'
    }
  }

  async function deleteTodo(id: string) {
    error.value = ''
    try {
      const res = await fetch(`${apiBase}/v1/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!res.ok) throw new Error('Failed to delete TODO')
      await fetchTodos()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error deleting TODO'
    }
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
  }
} 