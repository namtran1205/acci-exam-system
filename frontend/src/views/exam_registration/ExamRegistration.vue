<template>
    <div class="relative flex flex-col">
      <h1 class="mb-8 text-center text-3xl font-bold">Exam Registration</h1>
  
      <div class="flex items-center justify-between">
        <BackButton @click="backPage" />
        <BaseButton
          iconType="New"
          buttonText="New"
          @click="redirectRegistration"
        />
        
      </div>

      <FormField class="mb-4">
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Search participants..."
            v-model="searchQuery"
            class="w-full border border-transparent rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent"
          />
          <IconSearch class="absolute right-3 text-gray-500" />
        </div>
      </FormField>


  
      <FormField class="mb-4">
          <div
            v-for="customer in filteredCustomers"
            :key="customer.id"
            class="border-leaf flex cursor-pointer items-center justify-between border-b p-2 last:border-b-0 hover:bg-gray-200"
            @click="viewParticipantDetails(customer.id)"
          >
          <div class="flex items-center">
            <CustomerAvatar :customerType="customer.customerType" class="mr-3"/>
            <div>
              <div class="font-medium">ID {{ customer.id }}</div>
              <div class="text-sm text-gray-600"> by {{ customer.name }}</div>
            </div>
          </div>
          </div>
        
      </FormField>
  
      <!-- Pagination -->
      <div class="flex justify-between mt-10">
        <button
          class="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-white"
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          ←
        </button>
  
        <div class="flex space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            class="flex h-8 w-8 items-center justify-center rounded-full"
            :class="page === currentPage ? 'bg-lime-500 text-white' : 'bg-gray-300 text-gray-700'"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </div>
  
        <button
          class="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-white"
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          →
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from "vue";
//   import axios from "axios";
  import { useRouter } from "vue-router";
  import CustomerAvatar from "@/components/CustomerAvatar.vue";
  import BaseButton from "@/components/BaseButton.vue";
  import BackButton from "@/components/BackButton.vue";
  import FormField from "@/components/FormField.vue";
  import IconSearch from "@/components/icons/IconSearch.vue";
  
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
  
const currentPage = ref(1);
  const totalPages = 10;
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      currentPage.value = page;
    }
  };
  
  
  
  // interface Participant {
  //   id: number;
  //   name: string;
  //   gender: string;
  //   dateOfBirth: string;
  // }
  
  // const participants = ref<Participant[]>([]);
  // const totalPages = ref(1);
  // const currentPage = ref(1);
  // const searchQuery = ref("");
  
//   const fetchParticipants = async (page: number) => {
//     try {
//       const response = await axios.get(`/api/participants?page=${page}`);
//       participants.value = response.data.data;
//       totalPages.value = response.data.totalPages;
//     } catch (error) {
//       console.error("Error fetching participants:", error);
//     }
//   };
  
//   onMounted(() => {
//     fetchParticipants(currentPage.value);
//   });
  
//   const changePage = (page: number) => {
//     if (page >= 1 && page <= totalPages.value) {
//       currentPage.value = page;
//       fetchParticipants(page);
//     }
//   };
  
//   const filteredParticipants = computed(() => {
//     if (!searchQuery.value) return participants.value;
  
//     const query = searchQuery.value.toLowerCase();
//     return participants.value.filter(
//       (p) =>
//         p.name.toLowerCase().includes(query) ||
//         p.id.toString().includes(query) ||
//         p.gender.toLowerCase().includes(query),
//     );
//   });
  
  const redirectRegistration = () => {
    router.push({ name: "new_exam_registration" });
  };
  
  const viewParticipantDetails = (participantId: number) => {
    router.push({ name: "participant_details", params: { id: participantId } });
  };
  const backPage = () => {
    router.go(-1);
  };
  </script>
  