<template>
    <button
        class="mb-2 flex cursor-pointer items-center font-bold text-leaf hover:text-lime-900"
        @click="onClick"
      >
        <span class="mr-2"><</span> Back
    </button>
</template>

<script setup lang="ts">
defineProps<{
  onClick: () => void;
}>();
</script>