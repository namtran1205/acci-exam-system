<template>
    <!-- Form Content -->
    <div class="flex-1">
      <div class="mx-auto max-w-2xl">
        <h2 class="mb-8 text-center text-3xl font-bold">New Customer</h2>
  
        <!-- Back Button -->
        <BackButton />
  
        <!-- Customer Type Section -->
        <div class="mb-6">
          <h3 class="mb-4 font-bold">Customer Type</h3>
  
          <!-- Individual Option -->
          <div class="border-live-olive mb-2 rounded-lg border bg-white p-4">
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
          <div class="border-live-olive rounded-lg border bg-black/25 p-4">
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
            class="bg-moss flex cursor-pointer items-center rounded from-black/25 to-black/25 px-4 py-2 font-bold text-white hover:bg-gradient-to-r"
          >
            Next <span class="ml-4">></span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import BackButton from "@/components/BackButton.vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const customerType = ref<string | null>("customerType");
  
  const redirectToNextPage = () => {
    router.push({ path: "/customers/new/individual" });
  };
  </script>