<template>
  <div
    class="flex cursor-pointer items-center justify-between border-b p-2 last:border-b-0 hover:bg-gray-200"
    @click="$emit('view-details', item.id)"
  >
    <div class="flex items-center">
      <div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-transparent">
        <img src="/individual.png" alt="Individual Avatar" class="h-8 w-8 rounded-full" />
      </div>
      <div>
        <div class="font-medium">ID {{ item.id }}</div>
        <div class="text-sm text-gray-600">{{ item.name }}</div>
        <div class="text-xs text-gray-600">{{ item.course }}, Shift {{ item.shift }}</div>
      </div>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
