<script setup lang="ts">
import { useEditingScheduleStore, useWorkingSchedulesStore } from "@/stores/working-schedule";
import { useRouter } from "vue-router";
import IconEdit from "./icons/IconEdit.vue";
import IconExam from "./icons/IconExam.vue";

const props = defineProps<{
  schedule: {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    location: string;
    price: number;
    count: number;
    slots: number;
  };
  editMode?: boolean;
}>();

const workingSchedules = useWorkingSchedulesStore();
const editingSchedule = useEditingScheduleStore();
const router = useRouter();

function handleClick() {
  if (props.editMode) {
    editingSchedule.schedule = props.schedule;
    router.push({ path: "/schedules/edit" });
  } else {
    workingSchedules.toggleSchedule(props.schedule);
  }
}
</script>

<template>
  <button
    class="flex cursor-pointer flex-row items-center gap-2 from-black/10 to-black/10 px-4 py-2 first-of-type:rounded-t-lg last-of-type:rounded-b-lg hover:bg-gradient-to-r"
    @click="handleClick"
  >
    <div class="bg-live-olive flex size-8 shrink-0 items-center justify-center rounded-full">
      <IconExam class="size-4 fill-black" />
    </div>

    <div class="flex w-full flex-col items-start text-left">
      <span class="font-semibold">{{ schedule.name }}</span>
      <span>{{ new Date(schedule.startTime).toLocaleDateString([], { dateStyle: "short" }) }}</span>
      <span
        >{{ new Date(schedule.startTime).toLocaleTimeString([], { timeStyle: "short" }) }}-{{
          new Date(schedule.endTime).toLocaleTimeString([], { timeStyle: "short" })
        }}</span
      >
      <span class="text-black/50">{{ schedule.location }}</span>
    </div>

    <div class="shrink-0" v-if="editMode">
      <IconEdit class="size-4 fill-black" />
    </div>
    <div class="flex flex-col items-end" v-else>
      <span>{{ schedule.count }}/{{ schedule.slots }}</span>

      <span
        class="text-moss font-semibold"
        v-if="workingSchedules.schedules.some((node) => node.id == schedule.id)"
      >
        Selected
      </span>
      <span class="font-semibold" v-else>Select</span>
    </div>
  </button>
</template>
