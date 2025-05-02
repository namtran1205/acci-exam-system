<script setup lang="ts">
import IconLeftChevron from "./icons/IconLeftChevron.vue";
</script>

<template>
  <button
    @click="$router.back()"
    class="text-moss flex w-fit cursor-pointer flex-row items-center gap-2 rounded-sm p-2 font-semibold hover:underline"
  >
    <IconLeftChevron class="fill-moss size-5" />
    Back
  </button>
</template>
