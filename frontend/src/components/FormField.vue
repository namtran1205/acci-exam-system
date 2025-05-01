<!-- components/FormField.vue -->
<template>
    <div class="w-full">
      <label class="mb-1 block font-semibold text-black">{{ label }}</label>
    <div
      :class="[ 
        'rounded-md border border-leaf bg-white px-3 py-1', 
        customClass || '', 
      ]"
      style="min-height: 40px;"
    >
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    label?: string
    customClass?: string | null
  }>()
  </script>
  