<template>
    <div class="h-screen bg-lime-100">
      <!-- Customer Type Selection Screen -->
      <div v-if="currentStep === 'type-selection'" class="mx-auto max-w-2xl p-6">
        <h1 class="mb-8 text-center text-3xl font-bold">New Customer</h1>
        
        <button class="mb-8 flex items-center text-lime-700 hover:text-lime-900">
          <span class="mr-2 text-xl">←</span> 
          <span class="text-xl">Back</span>
        </button>
        
        <form @submit.prevent="handleTypeSelection">
          <div class="mb-10">
            <h2 class="mb-4 text-xl font-bold">Customer Type</h2>
            
            <!-- Individual Option -->
            <div class="mb-3 rounded-lg border border-gray-300 bg-white p-4">
              <label class="flex items-center">
                <div class="relative mr-3 h-6 w-6">
                  <input
                    type="radio"
                    name="customerType"
                    value="individual"
                    v-model="customerType"
                    class="absolute h-6 w-6 cursor-pointer opacity-0"
                  />
                  <div class="h-6 w-6 rounded-full border-2 border-gray-400" 
                       :class="{'border-lime-600': customerType === 'individual'}">
                    <div v-if="customerType === 'individual'" 
                         class="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-600">
                    </div>
                  </div>
                </div>
                <span class="text-lg">Individual</span>
              </label>
            </div>
            
            <!-- Organization Option -->
            <div class="rounded-lg border border-gray-300 bg-white p-4">
              <label class="flex items-center">
                <div class="relative mr-3 h-6 w-6">
                  <input
                    type="radio"
                    name="customerType"
                    value="organization"
                    v-model="customerType"
                    class="absolute h-6 w-6 cursor-pointer opacity-0"
                  />
                  <div class="h-6 w-6 rounded-full border-2 border-gray-400"
                       :class="{'border-lime-600': customerType === 'organization'}">
                    <div v-if="customerType === 'organization'" 
                         class="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-600">
                    </div>
                  </div>
                </div>
                <span class="text-lg">Organization</span>
              </label>
            </div>
          </div>
          
          <div class="flex justify-end">
            <button
              type="submit"
              class="flex items-center rounded-md bg-lime-600 px-6 py-3 text-lg font-medium text-white hover:bg-lime-700"
            >
              Next <span class="ml-2">→</span>
            </button>
          </div>
        </form>
      </div>
      
      <!-- Individual Form Screen -->
      <div v-else-if="currentStep === 'individual-form'" class="mx-auto max-w-2xl p-6">
        <h1 class="mb-8 text-center text-3xl font-bold">New Individual</h1>
        
        <button 
          @click="goBackToTypeSelection" 
          class="mb-8 flex items-center text-lime-700 hover:text-lime-900"
        >
          <span class="mr-2 text-xl">←</span> 
          <span class="text-xl">Back</span>
        </button>
        
        <form @submit.prevent="saveIndividual">
          <!-- Individual Name Field -->
          <div class="mb-6">
            <label for="name" class="mb-2 block text-xl font-bold">Individual Name</label>
            <input
              id="name"
              v-model="individualData.name"
              type="text"
              placeholder="John Doe"
              class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
            />
          </div>
          
          <!-- Phone Number Field -->
          <div class="mb-6">
            <label for="phone" class="mb-2 block text-xl font-bold">Phone Number</label>
            <input
              id="phone"
              v-model="individualData.phone"
              type="tel"
              placeholder="+1 235 513 1023"
              class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
            />
          </div>
          
          <!-- Email Address Field -->
          <div class="mb-10">
            <label for="email" class="mb-2 block text-xl font-bold">Email Address</label>
            <input
              id="email"
              v-model="individualData.email"
              type="email"
              placeholder="johndoe@example.com"
              class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
            />
          </div>
          
          <!-- Save Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="flex items-center rounded-md bg-lime-600 px-6 py-3 text-lg font-medium text-white hover:bg-lime-700"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="mr-2 h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" 
                />
              </svg>
              Save
            </button>
          </div>
        </form>
      </div>
      
      <!-- Organization Form Screen (placeholder) -->
      <div v-else-if="currentStep === 'organization-form'" class="mx-auto max-w-2xl p-6">
        <h1 class="mb-8 text-center text-3xl font-bold">New Organization</h1>
        
        <button 
          @click="goBackToTypeSelection" 
          class="mb-8 flex items-center text-lime-700 hover:text-lime-900"
        >
          <span class="mr-2 text-xl">←</span> 
          <span class="text-xl">Back</span>
        </button>
        
        <!-- Organization form fields would go here -->
        <p class="text-center text-lg">Organization form fields will be added here.</p>
        
        <div class="mt-10 flex justify-end">
          <button
            @click="saveOrganization"
            class="flex items-center rounded-md bg-lime-600 px-6 py-3 text-lg font-medium text-white hover:bg-lime-700"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="mr-2 h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" 
              />
            </svg>
            Save
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Define form data interfaces
  interface IndividualData {
    name: string;
    phone: string;
    email: string;
  }
  
  interface OrganizationData {
    name: string;
    // Add other organization fields as needed
  }
  
  // Form state
  type Step = 'type-selection' | 'individual-form' | 'organization-form';
  const currentStep = ref<Step>('type-selection');
  const customerType = ref<'individual' | 'organization'>('individual');
  
  const individualData = ref<IndividualData>({
    name: '',
    phone: '',
    email: ''
  });
  
  const organizationData = ref<OrganizationData>({
    name: ''
    // Initialize other organization fields
  });
  
  // Navigation methods
  const handleTypeSelection = () => {
    if (customerType.value === 'individual') {
      currentStep.value = 'individual-form';
    } else {
      currentStep.value = 'organization-form';
    }
  };
  
  const goBackToTypeSelection = () => {
    currentStep.value = 'type-selection';
  };
  
  // Form submission methods
  const saveIndividual = () => {
    console.log('Saving individual data:', individualData.value);
    
    // Validation
    if (!individualData.value.name || !individualData.value.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Here you would typically save the data to your backend
    alert('Individual data saved successfully!');
    
    // Reset and go back to type selection
    individualData.value = { name: '', phone: '', email: '' };
    currentStep.value = 'type-selection';
  };
  
  const saveOrganization = () => {
    console.log('Saving organization data:', organizationData.value);
    
    // Here you would typically save the data to your backend
    alert('Organization data saved successfully!');
    
    // Reset and go back to type selection
    organizationData.value = { name: '' };
    currentStep.value = 'type-selection';
  };
  </script>