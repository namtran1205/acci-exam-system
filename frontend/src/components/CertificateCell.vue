<template>
  <div
    class="flex cursor-pointer flex-row items-center gap-2 from-black/10 to-black/10 px-4 py-2 first-of-type:rounded-t-lg last-of-type:rounded-b-lg hover:bg-gradient-to-r"
  >
    <div class="bg-live-olive flex size-8 shrink-0 items-center justify-center rounded-full">
      <IconExam class="size-4 fill-black" />
    </div>

    <div class="flex w-full flex-col items-start text-left" @click="navigateToDetails">
      <span class="font-semibold">ID {{ certificate.certificate_id }}</span>
      <span class="text-sm font-semibold text-black/50">For: {{ certificate.participant_name }}</span>
      <span class="text-sm font-semibold text-black/50">Type: {{ certificate.exam_name }} </span>
      <span :class="{ 'text-red-500': !isReceived, 'text-green-500': isReceived }">
        {{ isReceived ? 'Received' : 'Not received' }}
      </span>
    </div>

    <div class="flex items-center justify-end shrink-0 ml-auto">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 5.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06.02z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconExam from "./icons/IconExam.vue";
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  certificate: {
    certificate_id: number;
    certificate_status: boolean; // Đã sửa thành boolean
    participant_name: string;
    exam_name: string;
    exam_address: string;
  };
}>();

const isReceived = computed(() => props.certificate.certificate_status);

function navigateToDetails() {
  router.push({
    name: 'certificate-details',
    params: {
      id: props.certificate.certificate_id,
    },
    query: {
      participantName: props.certificate.participant_name,
      examName: props.certificate.exam_name,
      examAddress: props.certificate.exam_address,
      certificateStatus: props.certificate.certificate_status, // Truyền boolean
    },
  });
}
</script>