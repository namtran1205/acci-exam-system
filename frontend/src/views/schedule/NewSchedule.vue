<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconClock from "@/components/icons/IconClock.vue";
import TextField from "@/components/TextField.vue";
import IconSave from "@/components/icons/IconSave.vue"; // Đảm bảo import IconCheckmark
import { ref } from "vue";

const newExaminationTitle = ref("");
const newExaminationDate = ref("");
const newStartTime = ref("");
const newEndTime = ref("");
const newLocation = ref("");

const handleSave = () => {
  console.log("Saving new examination schedule:", {
    title: newExaminationTitle.value,
    date: newExaminationDate.value,
    startTime: newStartTime.value,
    endTime: newEndTime.value,
    location: newLocation.value,
  });
};
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <h1 class="text-center text-2xl font-bold">New Examination Schedule</h1>

    <BackButton />

    <TextField
      label="Examination Title"
      placeholder="IELTS Academic"
      v-model="newExaminationTitle"
    />

    <TextField
      label="Examination Date"
      placeholder="2026/05/20"
      v-model="newExaminationDate"
    >
        <IconCalendar class="size-4 cursor-pointer" />
    </TextField>

    <TextField
      label="Start Time"
      placeholder="07:30 AM"
      v-model="newStartTime"
    >
        <IconClock class="size-4 cursor-pointer" />
    </TextField>

    <TextField
      label="End Time"
      placeholder="09:30 AM"
      v-model="newEndTime"
    >
        <IconClock class="size-4 cursor-pointer" />
    </TextField>

    <TextField
      label="Location"
      placeholder="Phòng 142, 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM"
      v-model="newLocation"
    />

    <button
      class="bg-moss flex w-fit items-center gap-2 self-end rounded-lg px-4 py-2 font-semibold text-white"
      @click="handleSave"
    >
      <IconSave class="size-5 fill-white" />
      Save
    </button>
  </div>
</template>
