import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: ''
  }),
  actions: {
    setName(name: string) {
      this.name = name
      if (import.meta.client) {
        localStorage.setItem('user_name', name)
      }
    },
    loadName() {
      if (import.meta.client) {
        const storedName = localStorage.getItem('user_name')
        if (storedName) {
          this.name = storedName
        }
      }
    }
  }
}) 