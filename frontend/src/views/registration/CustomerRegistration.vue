<template>
  <div class="border-b border-gray-200 py-3 text-center text-lg font-bold">
    Customers Registration
  </div>

  <div class="flex items-center justify-between p-3">
    <button class="flex items-center text-gray-600"><span class="mr-1">←</span> Back</button>
    <button class="flex items-center rounded-md bg-lime-500 px-3 py-1 text-white">
      <span class="mr-1">+</span> New
    </button>
  </div>

  <div class="mb-3 px-3">
    <div class="relative">
      <input
        type="text"
        placeholder="Search customers..."
        class="w-full rounded-md border border-gray-300 px-3 py-2 pr-10"
        v-model="searchQuery"
      />
      <button class="absolute top-2 right-2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </div>

  <div class="h-screen w-full flex-1 px-3">
    <div
      v-for="customer in filteredCustomers"
      :key="customer.id"
      class="flex cursor-pointer items-center justify-between border-b border-gray-200 p-2 hover:bg-gray-50"
      @click="viewCustomerDetails(customer.id)"
    >
      <div class="flex items-center">
        <div
          class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-white"
        >
          <span class="text-xs">{{ customer.avatar }}</span>
        </div>
        <div>
          <div class="font-medium">ID {{ customer.id }}</div>
          <div class="text-sm text-gray-600">{{ customer.name }}</div>
        </div>
      </div>
      <div class="text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>

  <div class="flex justify-between border-t border-gray-200 p-3">
    <button class="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-white">
      <span class="rtl:rotate-180">←</span>
    </button>
    <div class="flex space-x-2">
      <button class="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-white">
        1
      </button>
      <button
        class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-700"
      >
        2
      </button>
      <button
        class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-700"
      >
        3
      </button>
      <button
        class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-700"
      >
        4
      </button>
    </div>
    <button class="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-white">
      <span class="rtl:rotate-180">→</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Customer {
  id: number;
  name: string;
  avatar: string;
}

const customers = ref<Customer[]>([
  { id: 1, name: "John Doe", avatar: "JD" },
  { id: 2, name: "Sarah Council", avatar: "SC" },
  { id: 3, name: "Truong Van Minh", avatar: "TM" },
]);

const searchQuery = ref("");

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value;

  const query = searchQuery.value.toLowerCase();
  return customers.value.filter(
    (customer) =>
      customer.name.toLowerCase().includes(query) || customer.id.toString().includes(query),
  );
});

const viewCustomerDetails = (id: number) => {
  console.log(`Viewing customer with ID: ${id}`);
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
