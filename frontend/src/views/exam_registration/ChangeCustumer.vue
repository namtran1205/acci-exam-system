<template>
    <div class="relative flex flex-col">
      <h1 class="mb-8 text-center text-3xl font-bold">New Exam Registration</h1>
      
      <div class="mb-4">
        <FormField class="mb-4" label="Selet a customer to register to: ">
            <div
        v-for="customer in paginatedCustomers"
        :key="customer.id"
        class="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
        @click="selectCustomer(customer)"
      >
        <div class="flex items-center">
          <CustomerAvatar :customerType="customer.customerType" class="mr-3" />
          <div>
            <div class="font-medium">ID {{ customer.id }}</div>
            <div class="text-sm text-gray-600"> {{ customer.name }}</div>
          </div>
        </div>
        <div class="text-green-700 font-semibold">
          {{ customer.id === selectedCustomerId ? 'Selected' : 'Select' }}
        </div>
        </div>
        </FormField>


        <!-- Pagination -->
        <div class="mt-4 flex justify-center items-center space-x-2">
        <button @click="prevPage" :disabled="currentPage === 1">←</button>
        <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="px-2 py-1 rounded-full"
            :class="{
            'bg-green-700 text-white': page === currentPage,
            'bg-green-200': page !== currentPage
            }"
        >
            {{ page }}
        </button>
            <button @click="nextPage" :disabled="currentPage === totalPages">→</button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormField from '@/components/FormField.vue'; 
import CustomerAvatar from '@/components/CustomerAvatar.vue';

const router = useRouter();
interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  customerType: "Individual" | "Organization";
}

const customers = ref<Customer[]>([
  {
    id: 1, 
    name: "Nguyen Phuc An",
    customerType: "Individual",
    phone: "+1 235 513 1023",
    email: "nguyenphucanpth@gmail.com",
  },
  {
    id: 2,
    name: "Sarah Council",
    customerType: "Organization",
    phone: "+1 235 513 1023",
    email: "haha@gmail.com",
  },
  {
    id: 3,
    name: "Truong Van Minh",
    customerType: "Organization",
    phone: "+1 235 513 1023",
    email: "tranminhvuongtuan@gmail.com",
  },
    {
        id: 4,
        name: "Nguyen Van A",
        customerType: "Individual",
        phone: "+1 235 513 1023",
        email: "ng@gmail.com",
    },
    {
        id: 5,
        name: "Nguyen Van B",
        customerType: "Individual",
        phone: "+1 235 513 1023",
        email: "ff",
    },
    {
        id: 6,
        name: "Nguyen Van C",
        customerType: "Individual",
        phone: "+1 235 513 1023",
        email: "ff",
    },

]);

const selectedCustomerId = ref(Number(router.currentRoute.value.query.selectedId ?? 1))

function selectCustomer(customer: any) {
  if (customer.id !== selectedCustomerId.value) {
    router.push({ name: 'NewExamRegistration', query: { selectedId: customer.id } })
  }
  
}
const currentPage = ref(1)
const itemsPerPage = 5;
const totalPages = computed(() => Math.ceil(customers.value.length / itemsPerPage))
const paginatedCustomers = computed(() =>
  customers.value.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
)
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function goToPage(page: number) {
  currentPage.value = page
}



</script>