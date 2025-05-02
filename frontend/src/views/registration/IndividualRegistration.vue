<template>
  <h1 class="mb-4 text-center text-3xl font-bold">Individual Details</h1>
  <button
    @click="goBack"
    class="text-leaf mb-4 flex cursor-pointer items-center font-bold hover:text-lime-900"
  >
    <span class="mr-2 text-xl">&lt;</span>
    <span>Back</span>
  </button>

  <div class="mb-4">
    <label for="name" class="mb-2 block text-xl font-bold">Individual Name</label>
    <input
      id="name"
      v-model="individualData.name"
      type="text"
      placeholder="John Doe"
      class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
    />
  </div>
  <div class="mb-4">
    <label for="phone" class="mb-2 block text-xl font-bold">Phone Number</label>
    <input
      id="phone"
      v-model="individualData.phone"
      type="tel"
      placeholder="+1 235 513 1023"
      class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
    />
  </div>
  <div class="mb-4">
    <label for="email" class="mb-2 block text-xl font-bold">Email Address</label>
    <input
      id="email"
      v-model="individualData.email"
      type="email"
      placeholder="johndoe@example.com"
      class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
    />
  </div>

  <div class="flex justify-end">
    <button
      type="button"
      @click="goBack"
      class="bg-leaf flex cursor-pointer items-center rounded-md bg-gray-400 px-4 py-2 font-medium text-white hover:bg-gray-500"
    >
      <img src="/register_btn.png" class="mr-2 h-6 w-6" />
      Save
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const individualData = ref({
  id: route.params.id as string,
  name: route.params.name as string,
  phone: route.params.phone as string,
  email: route.params.email as string,
  type: route.params.type as string,
});

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped></style>
