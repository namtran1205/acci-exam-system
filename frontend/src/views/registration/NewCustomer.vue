<template>
    <div class="h-screen bg-lime-200">
    
        <!-- Form Content -->
        <div class="flex-1 bg-lime-50 p-8">
          <div class="mx-auto max-w-2xl">
            <h2 class="mb-8 text-center text-2xl font-bold">New Customer</h2>
  
            <!-- Back Button -->
            <button class="mb-8 flex items-center text-lime-700 hover:text-lime-900">
              <span class="mr-2"><</span> Back
            </button>
  
              <!-- Customer Type Section -->
              <div class="mb-6">
                <h3 class="mb-4 font-bold">Customer Type</h3>
                
                <!-- Individual Option -->
                <div class="mb-2 rounded border border-gray-200 p-4">
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
                <div class="rounded border border-gray-200 p-4">
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
                <button @click = "redirectToNextPage"
                  class="flex items-center rounded bg-lime-600 px-4 py-2 text-white hover:bg-lime-700"
                >
                  Next <span class="ml-1">></span>
              </button>
              </div>
          </div>
        </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const customerType = ref<string|null>("customerType");
  //Redirect to another page when clicking the next button
  
    const redirectToNextPage = () => {
        router.push({ name: 'registration/new_customer/individual', 
            params: { customerType: customerType.value },
         });
    }
  </script>
  