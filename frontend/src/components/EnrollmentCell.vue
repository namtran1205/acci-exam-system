<script setup lang="ts">
import { useEnrollmentDetailsStore } from "@/stores/enrollment-details";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import IconPerson from "./icons/IconPerson.vue";
import IconRightChevron from "./icons/IconRightChevron.vue";

interface EnrollmentResult {
  enrollments: {
    id: number;
    number: string;
    state: "pending" | "cancelled";
  };
  participants: {
    id: number;
    name: string;
    gender: "male" | "female" | "nonbinary" | "idiot";
  };
  schedule: {
    startTime: string;
    endTime: string;
    location: string;
    name: string;
  };
  customer: {
    name: string;
    phone: string;
    role: string;
  };
}

const props = defineProps<{
  data: EnrollmentResult;
}>();

const timeString = ref("");
const router = useRouter();
const enrollmentDetails = useEnrollmentDetailsStore();

onMounted(() => {
  timeString.value = `Shift ${new Date(props.data.schedule.startTime).toLocaleTimeString([], { timeStyle: "short" })}-${new Date(props.data.schedule.endTime).toLocaleTimeString([], { timeStyle: "short" })}`;
});

function navigateToDetails() {
  enrollmentDetails.enrollment = {
    id: props.data.enrollments.id,
    number: props.data.enrollments.number,
    name: props.data.participants.name,
    customer: {
      ...props.data.customer,
    },
    exam: {
      ...props.data.schedule,
    },
    extensions: [],
  };
  router.push({ path: "/enrollments/details" });
}
</script>

<template>
  <button
    class="flex w-full cursor-pointer flex-row items-center gap-2 px-3 py-2 duration-200 first-of-type:rounded-t-lg last-of-type:rounded-b-lg hover:bg-black/10"
    @click="navigateToDetails"
  >
    <div class="bg-live-olive flex size-8 shrink-0 items-center justify-center rounded-full">
      <IconPerson class="size-4 fill-black" />
    </div>

    <div class="flex w-full flex-col items-start">
      <span class="font-semibold">ID {{ data.enrollments.id }}</span>
      <span>{{ data.participants.name }}</span>
      <span class="text-sm font-semibold text-black/50"
        >{{ data.schedule.name }} - {{ timeString }}</span
      >
    </div>

    <IconRightChevron class="size-8 shrink-0 fill-black" />
  </button>
</template>
