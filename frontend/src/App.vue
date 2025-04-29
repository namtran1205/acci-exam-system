<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header
    class="bg-moss font-merriweather flex h-16 w-full items-center justify-center rounded-b-xl"
  >
    <a href="/" class="hover:text-australian-mint text-[2rem] font-bold text-white duration-200"
      >ACCI</a
    >
  </header>

  <main class="p-4 lg:mx-auto lg:max-w-[640px] lg:p-8">
    <RouterView />
  </main>
</template>
