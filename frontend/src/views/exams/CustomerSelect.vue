<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import CustomerAvatar from "@/components/CustomerAvatar.vue";
import FormField from "@/components/FormField.vue";
import { PUBLIC_API } from "@/services/main";
import { useNewCustomerSelect } from "@/stores/new-customer-select";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: "individual" | "organization";
}

const customers = ref<Customer[]>([]);
const customerSelect = useNewCustomerSelect();
const router = useRouter();

onMounted(() => {
  fetch(`${PUBLIC_API}/customers`, {
    mode: "cors",
    credentials: "include",
  }).then(async (res) => {
    if (res.status == 200) {
      customers.value = [...(await res.json())];
    }
  });
});

function select(customer: Customer) {
  customerSelect.customer = customer;
  router.back();
}
</script>

<template>
  <div class="relative flex flex-col">
    <h1 class="mb-8 text-center text-3xl font-bold">New Exam Registration</h1>

    <BackButton />

    <div class="mb-4">
      <FormField class="mb-4" label="Selet a customer to register to: ">
        <div
          v-for="customer in customers"
          :key="customer.id"
          class="flex cursor-pointer items-center justify-between border-b p-3 last:border-b-0 hover:bg-gray-100"
          @click="select(customer)"
        >
          <div class="flex items-center">
            <CustomerAvatar :role="customer.role" class="mr-3" />
            <div>
              <div class="font-medium">ID {{ customer.id }}</div>
              <div class="text-sm text-gray-600">{{ customer.name }}</div>
            </div>
          </div>
            <div :class="customer.id === customerSelect.customer?.id ? 'font-semibold text-moss' : 'font-semibold text-gray-500'">
            {{ customer.id === customerSelect.customer?.id ? "Selected" : "Select" }}
            </div>
        </div>
      </FormField>
    </div>
  </div>
</template>
