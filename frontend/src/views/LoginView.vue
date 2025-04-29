<script setup lang="ts">
import TextField from "@/components/TextField.vue";
import { ref } from "vue";

const username = ref("");
const password = ref("");

function login() {}
</script>

<template>
  <div
    class="border-live-olive bg-almost-white mt-32 flex w-full flex-col items-center justify-center gap-2.5 rounded-2xl border-[1px] px-4 py-8 duration-200 lg:gap-12 lg:px-8 lg:py-12"
  >
    <h1 class="text-2xl font-bold">Sign In</h1>

    <div class="flex w-full flex-col gap-4">
      <TextField label="Employee ID" input="text" v-model="username" />
      <TextField label="Password" input="password" v-model="password" />
    </div>

    <div class="flex w-full flex-col gap-4">
      <button
        class="bg-moss hover:bg-leaf h-16 w-full cursor-pointer rounded-lg font-bold tracking-widest text-white duration-200"
        @click="login"
      >
        LOGIN
      </button>
    </div>
  </div>
</template>
