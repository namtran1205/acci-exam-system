<template>
  <div class="mb-4">
    <div class="relative">
      <input
        type="text"
        :placeholder="placeholder"
        class="bg-almost-white border-leaf w-full rounded-md border px-3 py-2 pr-10"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button class="absolute top-2 right-2 text-gray-500">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    default: "Search...",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
