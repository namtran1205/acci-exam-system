<template>
  <div class="h-screen">
    <div class="container mx-auto rounded-lg" style="max-width: 700px">
      <div class="mb-6">
        <button @click="goBack" class="flex items-center text-gray-600 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        <h1 class="mt-4 text-2xl font-bold text-gray-800">Exam Taker Details</h1>
      </div>

      <div class="mb-8">
        <h2 class="mb-2 text-lg font-semibold text-gray-700">Information</h2>
        <div class="border-leaf rounded-md border border-b bg-white p-1">
          <div class="mb-4 flex items-center border-b p-3 pb-2">
            <strong class="w-5 text-gray-600">ID</strong>
            <p class="text-gray-800">{{ taker.id }}</p>
          </div>
          <div class="mb-2 flex items-center border-b pb-2">
            <div class="mr-2 rounded-full bg-green-200 p-1 ml-3 text-green-700">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div class="ml-3 text-gray-800">{{ taker.name }}</div>
          </div>
          <div class="mb-4 flex items-start border-b p-2 pb-2">
            <div class="relative">
              <div class="mt-1 flex items-center">
                <div class="mr-2 rounded-full bg-blue-200 p-1 text-blue-700">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h.01M9 11h1m-1 4h.01M9 15h1m-1 4h.01M9 19h1"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <strong class="absolute -top-4 text-gray-600">Registered to</strong>
                  <p class="text-gray-800">
                    {{ taker.registeredTo.name }} ({{ taker.registeredTo.type }})
                  </p>
                  <p class="text-sm text-gray-500">{{ taker.phone }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3 flex items-center">
            <div class="ml-3 rounded-full bg-yellow-200 p-1 text-yellow-700">
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
                  d="M7 21h10a2 2 0 002-2V9a2 2 0 00-2-2h-10a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6m-3 3v3m-3-3h.01M12 12v3m-.01-3H12m3-3h.01M15 9h.01M15 12v3m-.01-3H15"
                />
              </svg>
            </div>
            <div class="ml-4">
              <strong class="text-gray-800">{{ taker.Level }}</strong>
              <p class="text-gray-800">{{ taker.examDate }}</p>
              <p class="text-sm text-gray-500">{{ taker.examTime }}</p>
              <p class="text-sm text-gray-500">{{ taker.examLocation }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-2 text-lg font-semibold text-gray-700">Extensions</h2>
        <div class="rounded-md border border-gray-200 bg-white p-4">
          <ul v-if="taker.extensions && taker.extensions.length > 0" class="space-y-2">
            <li
              v-for="(extension, index) in taker.extensions"
              :key="index"
              class="flex items-center border-b pb-2 last:border-b-0"
            >
              <div class="mr-2 rounded-full bg-green-200 p-1 text-green-700">
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m15.357 2H9.864m-9.11 5h10.396m-0.135-2H15.5a3 3 0 01-3-3 3 3 0 00-3-3H6.18"
                  />
                </svg>
              </div>
              <p class="text-gray-800">
                {{ extension.date }}
                <span class="text-sm text-gray-500">- {{ extension.type }}</span>
              </p>
            </li>
          </ul>
          <p v-else class="text-gray-500">No extensions available.</p>
        </div>
      </div>

      <div class="mt-8 flex justify-end space-x-4">
        <button
          class="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 inline-block h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add extension
        </button>
        <button
          class="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 inline-block h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const taker = ref({
  id: route.params.id,
  name: route.query.name,
  registeredTo: {
    name: route.query.registeredToName,
    type: route.query.registeredToType,
  },
  phone: route.query.phone,
  Level: route.query.Level,
  examDate: route.query.examDate,
  examTime: route.query.examTime,
  examLocation: route.query.examLocation,
  extensions: JSON.parse(route.query.extensions || "[]"),
});

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
/* Bỏ background color */
</style>
