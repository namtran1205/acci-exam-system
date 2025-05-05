<template>
  <div class="mb-2 flex gap-2">
    <span class="font-semibold text-gray-700">{{ label }}:</span>
    <span class="text-gray-800">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    default: "",
  },
});
</script>
