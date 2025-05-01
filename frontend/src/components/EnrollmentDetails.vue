<script setup lang="ts">
import { useEnrollmentDetailsStore } from "@/stores/enrollment-details";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import IconCalendar from "./icons/IconCalendar.vue";
import IconCertificate from "./icons/IconCertificate.vue";
import IconPerson from "./icons/IconPerson.vue";

const router = useRouter();
const enrollmentDetails = useEnrollmentDetailsStore();

onMounted(() => {
  if (!enrollmentDetails.enrollment) {
    router.replace({ path: "/enrollments" });
  }
});
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <h2 class="font-semibold">Information</h2>

    <div
      class="border-live-olive bg-almost-white divide-live-olive flex flex-col divide-y-[1px] rounded-lg border-[1px]"
    >
      <span class="px-4 py-2 font-semibold">ID {{ enrollmentDetails.enrollment?.id }}</span>

      <div class="flex w-full flex-row items-center gap-2 px-4 py-2">
        <div class="bg-live-olive flex size-8 items-center justify-center rounded-full">
          <IconPerson class="size-4 fill-black" />
        </div>

        <div class="flex flex-col">
          <p>{{ enrollmentDetails.enrollment?.name }}</p>
          <span class="text-sm text-black/50">{{ enrollmentDetails.enrollment?.number }}</span>
        </div>
      </div>

      <div class="flex w-full flex-row items-center gap-2 px-4 py-2">
        <div class="bg-live-olive flex size-8 items-center justify-center rounded-full">
          <IconCertificate class="size-4 fill-black" />
        </div>

        <div class="flex flex-col">
          <span class="font-semibold">Registered to</span>
          <p>
            {{ enrollmentDetails.enrollment?.customer.name }} ({{
              enrollmentDetails.enrollment?.customer.role == "individual"
                ? "Individual"
                : "Organization"
            }})
          </p>
          <span class="text-sm text-black/50">{{
            enrollmentDetails.enrollment?.customer.phone
          }}</span>
        </div>
      </div>

      <div class="flex w-full flex-row items-center gap-2 px-4 py-2">
        <div class="bg-live-olive flex size-8 items-center justify-center rounded-full">
          <IconCalendar class="size-4 fill-black" />
        </div>

        <div class="flex flex-col">
          <span class="font-semibold">{{ enrollmentDetails.enrollment?.exam.name }}</span>
          <span>{{
            new Date(enrollmentDetails.enrollment?.exam.startTime ?? "").toLocaleDateString([], {
              dateStyle: "short",
            })
          }}</span>
          <span
            >{{
              new Date(enrollmentDetails.enrollment?.exam.startTime ?? "").toLocaleTimeString([], {
                timeStyle: "short",
              })
            }}-{{
              new Date(enrollmentDetails.enrollment?.exam.endTime ?? "").toLocaleTimeString([], {
                timeStyle: "short",
              })
            }}</span
          >
          <span class="text-sm text-black/50">{{
            enrollmentDetails.enrollment?.exam.location
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
