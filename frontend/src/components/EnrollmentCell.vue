<script setup lang="ts">
import { onMounted, ref } from "vue";
import IconPerson from "./icons/IconPerson.vue";
import IconRightChevron from "./icons/IconRightChevron.vue";

const props = defineProps<{
  identifier: number;
  name: string;
  exam: string;
  startTime: string;
  endTime: string;
}>();

const timeString = ref("");

onMounted(() => {
  timeString.value = `Shift ${new Date(props.startTime).toLocaleTimeString([], { timeStyle: "short" })}-${new Date(props.endTime).toLocaleTimeString([], { timeStyle: "short" })}`;
});
</script>

<template>
  <button
    class="flex w-full cursor-pointer flex-row items-center gap-2 px-3 py-2 duration-200 first-of-type:rounded-t-lg last-of-type:rounded-b-lg hover:bg-black/10"
  >
    <div class="bg-live-olive flex size-8 shrink-0 items-center justify-center rounded-full">
      <IconPerson class="size-4 fill-black" />
    </div>

    <div class="flex w-full flex-col items-start">
      <span class="font-semibold">ID {{ identifier }}</span>
      <span>{{ name }}</span>
      <span class="text-sm font-semibold text-black/50">{{ exam }} - {{ timeString }}</span>
    </div>

    <IconRightChevron class="size-8 shrink-0 fill-black" />
  </button>
</template>
