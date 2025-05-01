<template>
  <!-- Form Content -->
  <div class="flex-1">
    <div class="mx-auto max-w-2xl">
      <h2 class="mb-8 text-center text-3xl font-bold">New Customer</h2>

      <!-- Back Button -->
      <button
        class="text-leaf mb-2 flex cursor-pointer items-center font-bold hover:text-lime-900"
        @click="backPage"
      >
        <span class="mr-2"><</span> Back
      </button>

      <!-- Customer Type Section -->
      <div class="mb-6">
        <h3 class="mb-4 font-bold">Customer Type</h3>

        <!-- Individual Option -->
        <div class="mb-2 rounded rounded-xl border border-2 border-green-400 bg-white p-4">
          <label class="flex items-center">
            <input
              type="radio"
              name="customerType"
              value="individual"
              v-model="customerType"
              class="mr-3 h-5 w-5"
            />
            <span>Individual</span>
          </label>
        </div>

        <!-- Organization Option -->
        <div class="bg-almost-white rounded rounded-xl border border-2 border-green-400 p-4">
          <label class="flex items-center">
            <input
              disabled
              type="radio"
              name="customerType"
              value="organization"
              v-model="customerType"
              class="mr-3 h-5 w-5"
            />
            <span>Organization</span>
          </label>
        </div>
      </div>

      <!-- Next Button -->
      <div class="flex justify-end">
        <button
          @click="redirectToNextPage"
          class="flex cursor-pointer items-center rounded bg-lime-600 px-4 py-2 font-bold text-white hover:bg-lime-700"
        >
          Next <span class="ml-4">></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const customerType = ref<string | null>("customerType");

const redirectToNextPage = () => {
  router.push({ name: "individual", params: { customerType: customerType.value } });
};

const backPage = () => {
  router.go(-1);
};
</script>
