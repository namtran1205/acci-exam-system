<template>
  
    
            <div class="text-center py-3 font-bold text-lg border-b border-gray-200">
              Customers Registration
            </div>
  
            <div class="flex justify-between items-center p-3">
              <button class="flex items-center text-gray-600">
                <span class="mr-1">←</span> Back
              </button>
              <button class="bg-lime-500 text-white px-3 py-1 rounded-md flex items-center">
                <span class="mr-1">+</span> New
              </button>
            </div>
  
            <div class="px-3 mb-3">
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search customers..."
                  class="w-full border border-gray-300 rounded-md py-2 px-3 pr-10"
                  v-model="searchQuery"
                />
                <button class="absolute right-2 top-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
  
            <div class="flex-1 px-3 w-full h-screen">
              <div
                v-for="customer in filteredCustomers"
                :key="customer.id"
                class="flex items-center justify-between p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                @click="viewCustomerDetails(customer.id)"
              >
                <div class="flex items-center">
                  <div class="bg-lime-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    <span class="text-xs">{{ customer.avatar }}</span>
                  </div>
                  <div>
                    <div class="font-medium">ID {{ customer.id }}</div>
                    <div class="text-sm text-gray-600">{{ customer.name }}</div>
                  </div>
                </div>
                <div class="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
  
            <div class="flex justify-between p-3 border-t border-gray-200">
              <button class="bg-lime-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                <span class="rtl:rotate-180">←</span>
              </button>
              <div class="flex space-x-2">
                <button class="bg-lime-500 text-white w-8 h-8 rounded-full flex items-center justify-center">1</button>
                <button class="bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center">2</button>
                <button class="bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center">3</button>
                <button class="bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center">4</button>
              </div>
              <button class="bg-lime-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                <span class="rtl:rotate-180">→</span>
              </button>
            </div>


  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  interface Customer {
    id: number
    name: string
    avatar: string
  }
  
  const customers = ref<Customer[]>([
    { id: 1, name: 'John Doe', avatar: 'JD' },
    { id: 2, name: 'Sarah Council', avatar: 'SC' },
    { id: 3, name: 'Truong Van Minh', avatar: 'TM' },
  ])
  
  const searchQuery = ref('')
  
  const filteredCustomers = computed(() => {
    if (!searchQuery.value) return customers.value
  
    const query = searchQuery.value.toLowerCase()
    return customers.value.filter(customer =>
      customer.name.toLowerCase().includes(query) ||
      customer.id.toString().includes(query)
    )
  })
  
  const viewCustomerDetails = (id: number) => {
    console.log(`Viewing customer with ID: ${id}`)
  }
  </script>

  <style scoped>
    html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

  </style>