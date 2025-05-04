<script setup lang="ts"></script>

<template>
  <div class="my-10 flex w-full flex-col items-center gap-4">
    <img src="/internet_404_page_not_found.png" alt="Page not found" class="aspect-auto h-64" />

    <div class="flex flex-col text-center">
      <h1 class="text-2xl font-bold">Page not found</h1>
      <p>Are you lost?</p>
    </div>

    <RouterLink
      to="/"
      class="bg-moss w-fit rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r"
    >
      Back to reality
    </RouterLink>
  </div>
</template>
