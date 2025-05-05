<template>
  <div class="flex h-full flex-col">
    <h1 class="p-4 text-center text-xl font-semibold text-gray-800">View Certificate</h1>

    <div class="flex flex-grow flex-row justify-between p-4">
      <div class="items-start">
        <BackButton />
      </div>
      <div class="items-end">
        <button
          @click="markAsReceived"
          class="flex cursor-pointer items-center rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white"
        >
          <svg
            v-if="!isReceived"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="mr-1 h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.97 3.97 7.473-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            />
          </svg>
          <ReceivedIcon v-else class="mr-3 h-3 w-3" />
          {{ isReceived ? "Received" : "Mark as received" }}
        </button>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="w-full rounded-md border-2 border-green-200 bg-white p-6">
        <h2 class="mb-4 text-center text-xl font-semibold">CERTIFICATION</h2>
        <CertificateDetailItem label="ID" :value="certificateDetails.certificate_id?.toString()" />
        <CertificateDetailItem
          label="Presented to"
          :value="certificateDetails.participant_name?.toString()"
        />
        <CertificateDetailItem
          label="Examination Type"
          :value="certificateDetails.exam_name?.toString()"
        />
        <CertificateDetailItem
          label="Examination Holder"
          :value="certificateDetails.exam_address?.toString()"
        />
        <div class="mt-4 flex items-center gap-4">
          <span class="font-semibold text-gray-700">Received Status</span>
          <span
            :class="{ 'text-red-500': !isReceived, 'text-green-500': isReceived }"
            class="font-semibold"
          >
            {{ isReceived ? "Received" : "Not received" }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import CertificateDetailItem from "@/components/CertificateDetailItem.vue";
import ReceivedIcon from "@/components/icons/ReceivedIcon.vue";
import { PUBLIC_API } from "@/services/main";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const certificateDetails = ref<{
  certificate_id: number | null;
  participant_name: string | null;
  exam_name: string | null;
  exam_address: string | null;
  certificate_status: boolean | null;
}>({
  certificate_id: null,
  participant_name: null,
  exam_name: null,
  exam_address: null,
  certificate_status: null,
});

const isReceived = computed(() => certificateDetails.value.certificate_status === true);

onMounted(() => {
  certificateDetails.value = {
    certificate_id: Number(route.params.id),
    participant_name: String(route.query.participantName),
    exam_name: String(route.query.examName),
    exam_address: String(route.query.examAddress),
    certificate_status: route.query.certificateStatus === "true",
  };
});

async function markAsReceived() {
  if (certificateDetails.value.certificate_id !== null) {
    try {
      const response = await fetch(`${PUBLIC_API}/certificates/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: certificateDetails.value.certificate_id,
        }),
      });
    } catch (error) {
      console.error("Error marking certificate as received:", error);
    }
  }
}
</script>
