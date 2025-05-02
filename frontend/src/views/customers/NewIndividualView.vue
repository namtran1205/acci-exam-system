<template>
    <h1 class="mb-4 text-center text-3xl font-bold">Individual Details</h1>
  
    <BackButton />
  
    <div class="mb-4">
      <label for="name" class="mb-2 block text-xl font-bold">Individual Name</label>
      <input
        id="name"
        v-model="name"
        type="text"
        placeholder="John Doe"
        class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
      />
    </div>
  
    <div class="mb-4">
      <label for="phone" class="mb-2 block text-xl font-bold">Phone Number</label>
      <input
        id="phone"
        v-model="phone"
        type="tel"
        placeholder="+1 235 513 1023"
        class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
      />
    </div>
  
    <div class="mb-4">
      <label for="email" class="mb-2 block text-xl font-bold">Email Address</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="johndoe@example.com"
        class="w-full rounded-lg border border-gray-300 bg-white p-4 text-lg"
      />
    </div>
  
    <div class="flex justify-end">
      <button
        type="button"
        @click="save"
        class="bg-leaf flex cursor-pointer items-center rounded-md px-4 py-2 font-medium text-white hover:bg-gray-500"
      >
        <img src="/register_btn.png" class="mr-2 h-6 w-6" alt="Save button" />
        Save
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import BackButton from "@/components/BackButton.vue";
  import { PUBLIC_API } from "@/services/main";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const name = ref("");
  const phone = ref("");
  const email = ref("");
  
  async function save() {
    const res = await fetch(`${PUBLIC_API}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        name: name.value,
        phone: phone.value,
        email: email.value,
        role: "individual",
      }),
    });
  
    if (res.status != 201) {
      alert("One or more fields have invalid values");
      return;
    }
  
    router.push({ path: "/" });
  }
  </script>
