<script setup lang="ts">
import { computed } from "vue";
import IconArrowBack from "./icons/IconArrowBack.vue";
import IconArrowNext from "./icons/IconArrowNext.vue";

const props = defineProps<{
  totalPages: number;
}>();

const page = defineModel<number>("page", { required: true });
const displayedPages = computed(() => {
  const starting = Math.max(page.value - 2, 1);
  const ending = Math.min(starting + 4, props.totalPages);
  return [...Array(ending - starting + 1).keys()].map((num) => num + starting);
});
</script>

<template>
  <div class="flex w-full flex-row items-center justify-between gap-4 text-white">
    <button
      class="bg-moss hover:bg-leaf flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="page == 1"
      @click="page--"
    >
      <IconArrowBack class="size-4 fill-white" />
    </button>

    <div class="flex w-full items-center justify-center gap-2">
      <template v-for="displayedPage in displayedPages">
        <button
          class="bg-moss hover:bg-leaf flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
          @click="page = displayedPage"
          :disabled="displayedPage == page"
        >
          {{ displayedPage }}
        </button>
      </template>
    </div>

    <button
      class="bg-moss hover:bg-leaf flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="page == totalPages"
      @click="page++"
    >
      <IconArrowNext class="size-4 fill-white" />
    </button>
  </div>
</template>
