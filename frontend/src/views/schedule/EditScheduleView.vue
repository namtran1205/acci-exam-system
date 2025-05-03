<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import ErrorOverlay from "@/components/ErrorOverlay.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconClock from "@/components/icons/IconClock.vue";
import IconSave from "@/components/icons/IconSave.vue";
import LoadingPopup from "@/components/LoadingPopup.vue";
import TextField from "@/components/TextField.vue";
import { makeJsonHeader, PUBLIC_API } from "@/services/main";
import { useEditingScheduleStore } from "@/stores/working-schedule";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const loading = ref(false);
const errorTitle = ref("");
const errorDetails = ref("");

const scheduleId = ref("");
const title = ref("");
const date = ref("");
const startTime = ref("");
const endTime = ref("");
const location = ref("");
const slots = ref("");
const price = ref("");

const router = useRouter();
const editingSchedule = useEditingScheduleStore();

onMounted(() => {
  if (!editingSchedule.schedule) {
    router.replace({ path: "/schedules" });
    return;
  }

  const startDate = new Date(editingSchedule.schedule.startTime);
  const endDate = new Date(editingSchedule.schedule.endTime);

  scheduleId.value = editingSchedule.schedule.id.toString();
  title.value = editingSchedule.schedule.name;
  date.value = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`;
  startTime.value = `${startDate.getHours().toString().padStart(2, "0")}:${startDate.getMinutes().toString().padStart(2, "0")}:${startDate.getSeconds().toString().padStart(2, "0")}`;
  endTime.value = `${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}:${endDate.getSeconds().toString().padStart(2, "0")}`;
  location.value = editingSchedule.schedule.location;
  slots.value = editingSchedule.schedule.slots.toString();
  price.value = editingSchedule.schedule.price.toString();
});

async function save() {
  loading.value = true;

  const start = new Date(`${date.value}T${startTime.value}`);
  const end = new Date(`${date.value}T${endTime.value}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    loading.value = false;
    errorTitle.value = "Invalid Date";
    errorDetails.value =
      "Start or end time must be in valid format. Please use YYYY-MM-DD for date and HH:MM:SS for time.";
    return;
  }

  if (end.getTime() - start.getTime() < 0) {
    loading.value = false;
    errorTitle.value = "Invalid Interval";
    errorDetails.value = "Start time must be the past, compared to end time.";
    return;
  }

  const res = await fetch(`${PUBLIC_API}/schedules`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: makeJsonHeader(),
    body: JSON.stringify({
      id: scheduleId.value,
      name: title.value,
      location: location.value,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      slots: slots.value,
      price: price.value,
    }),
  });

  loading.value = false;
  switch (res.status) {
    case 400:
      errorTitle.value = "Invalid Format";
      errorDetails.value = "Some fields are in an incorrect format.";
      break;
    case 201:
      router.back();
      break;
    default:
      errorTitle.value = "Unknown error";
      errorDetails.value = "An unknown error has occurred.";
      break;
  }
}
</script>

<template>
  <LoadingPopup v-if="loading" />
  <ErrorOverlay :error="errorTitle" :message="errorDetails" />

  <div class="flex w-full flex-col gap-6">
    <h2 class="text-center text-2xl font-bold">Edit Schedule</h2>

    <BackButton />

    <div class="flex w-full flex-col gap-4">
      <TextField label="Schedule ID" :model-value="scheduleId" @update:model-value="" readonly />
      <TextField label="Examination Title" placeholder="IELTS Academic" v-model="title" />
      <TextField label="Examination Date" placeholder="2025-06-01" v-model="date">
        <IconCalendar class="size-4 fill-black" />
      </TextField>
      <TextField label="Start Time" placeholder="08:50" v-model="startTime">
        <IconClock class="size-5 fill-black" />
      </TextField>
      <TextField label="End Time" placeholder="11:50" v-model="endTime">
        <IconClock class="size-5 fill-black" />
      </TextField>
      <TextField
        label="Location"
        placeholder="Room I42, 227 Nguyễn Văn Cừ Street, Ward 4, District 5, Ho Chi Minh City"
        large
        v-model="location"
      />
      <TextField label="Participant Slots" placeholder="50" v-model="slots" />
      <TextField label="Examination Price" placeholder="5.0" v-model="price" />
    </div>

    <button
      class="bg-leaf flex cursor-pointer items-center gap-2 self-end rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r"
      @click="save"
    >
      <IconSave class="size-5 fill-white" />
      Save
    </button>
  </div>
</template>
