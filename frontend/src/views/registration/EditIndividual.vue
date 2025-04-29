<template>
  <h1 class="mb-1 text-center text-3xl font-bold">Edit Individual</h1>

  <button
    @click="goBack"
    class="text-leaf mb-2 flex cursor-pointer items-center font-bold hover:text-lime-900"
  >
    <span class="mr-2 text-xl">&lt;</span>
    <span>Back</span>
  </button>

  <div class="mb-2">
    <label for="id" class="mb-2 block text-xl font-bold">Customer ID</label>
    <input
      id="id"
      v-model="individualData.id"
      type="text"
      class="w-full rounded-lg border border-gray-300 bg-gray-200 p-4 text-lg text-white"
      disabled
    />
  </div>
  <div class="mb-2">
    <label for="name" class="mb-2 block text-xl font-bold">Individual Name</label>
    <input
      id="name"
      v-model="individualData.name"
      type="text"
      class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
    />
  </div>
  <div class="mb-2">
    <label for="phone" class="mb-2 block text-xl font-bold">Phone Number</label>
    <input
      id="phone"
      v-model="individualData.phone"
      type="tel"
      class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
    />
  </div>
  <div class="mb-3">
    <label for="email" class="mb-2 block text-xl font-bold">Email Address</label>
    <input
      id="email"
      v-model="individualData.email"
      type="email"
      class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
    />
  </div>
  <div class="flex justify-end space-x-4">
    <button
      class="flex cursor-pointer items-center rounded-md bg-red-500 px-6 py-3 text-lg font-medium text-white hover:bg-red-600"
    >
      <img src="/register_btn.png" class="mr-2 h-6 w-6" />
      Delete
    </button>
    <button
      type="button"
      class="flex cursor-pointer items-center rounded-md bg-lime-600 px-6 py-3 text-lg font-medium text-white hover:bg-lime-700"
    >
      <img src="/register_btn.png" class="mr-2 h-6 w-6" />
      Save
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const individualData = ref({
  id: route.params.id as string,
  name: route.query.name as string,
  phone: route.query.phone as string,
  email: route.query.email as string,
});

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped></style>
