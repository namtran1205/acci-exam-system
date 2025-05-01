<script setup lang="ts">
import IconSearch from "./icons/IconSearch.vue";

defineProps<{
  placeholder?: string;
}>();

const search = defineModel();
</script>

<template>
  <div
    class="bg-almost-white border-live-olive hover:ring-live-olive/50 has-[:focus]:ring-live-olive flex h-12 w-full flex-row items-center justify-between gap-2 rounded-lg border-[1px] px-6 py-2 hover:ring-2 has-[:focus]:ring-2"
  >
    <input
      type="text"
      :placeholder
      class="w-full outline-none placeholder:text-black/50"
      v-model="search"
    />

    <IconSearch class="size-5 shrink-0 fill-black" />
  </div>
</template>
