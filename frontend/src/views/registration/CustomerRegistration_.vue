<template>
  <div class="relative flex flex-col">
    <h1 class="mb-8 text-center text-3xl font-bold">Customers Registration</h1>

    <div class="flex items-center justify-between">
      <button class="text-leaf flex items-center font-bold">
        <span class="mr-3">&lt;</span> Back
      </button>
      <button
        class="bg-moss hover:bg-leaf flex cursor-pointer items-center rounded-md bg-lime-500 px-3 py-1 text-white"
        @click="redirectRegistration"
      >
        <span class="mr-1">+</span> New
      </button>
    </div>

    <div class="mt-4 mb-3">
      <div class="relative">
        <input
          type="text"
          placeholder="Search customers..."
          class="bg-almost-white w-full rounded-md border border-gray-300 px-3 py-2 pr-10"
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

    <div class="flex-1">
      <div class="border-leaf bg-almost-white rounded-xl border-2 p-2">
        <div
          v-for="customer in filteredCustomers"
          :key="customer.id"
          class="border-leaf flex cursor-pointer items-center justify-between border-b p-2 last:border-b-0 hover:bg-gray-200"
          @click="viewCustomerDetails(customer.id)"
        >
          <div class="flex items-center">
            <div
              class="mr-3 flex h-8 w-8 items-center justify-center rounded-full"
              :class="
                customer.customerType === 'Individual' ? 'bg-transparent' : 'bg-lime-500 text-white'
              "
            >
              <img
                v-if="customer.customerType === 'Individual'"
                src="/individual.png"
                alt="Individual Avatar"
                class="h-8 w-8 rounded-full"
              />
              <img
                v-else-if="customer.customerType === 'Organization'"
                src="/organization.png"
                alt="Organization Avatar"
                class="h-8 w-8 rounded-full"
              />
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
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-32 flex justify-between">
      <button class="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-white">
        <span class="rtl:rotate-180">←</span>
      </button>
      <div class="flex space-x-2">
        <button
          class="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-white"
        >
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
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

const redirectRegistration = () => {
  router.push({ name: "new_customer" });
};

const viewCustomerDetails = (customerId: number) => {
  const customerdetails = customers.value.find((customer) => customer.id === customerId);
  if (customerdetails?.customerType === "Individual") {
    router.push({
      name: "individual_edit",
      params: {
        id: customerId,
      },
      query: {
        name: customerdetails?.name,
        phone: customerdetails?.phone,
        email: customerdetails?.email,
        type: customerdetails.customerType,
      },
    });
  }
};
</script>

<style scoped></style>
