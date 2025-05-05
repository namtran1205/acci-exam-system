<template>
  <div class="flex w-full flex-col gap-3">
    <h2 class="text-center text-2xl font-bold">Certificates Registration</h2>

    <div class="flex w-full flex-row items-center justify-between">
      <BackButton />

      <div class="flex flex-row items-center gap-2"></div>
    </div>

    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search certificates..."
        class="focus:border-leaf focus:ring-leaf w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm"
      />
      <div class="absolute top-1/2 right-3 -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5 text-gray-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </div>

    <div
      class="bg-almost-white border-live-olive divide-live-olive flex min-h-[19.5rem] w-full flex-col divide-y-[1px] rounded-lg border-[1px]"
    >
      <CertificateCell
        v-for="certificate in displayedCertificates"
        :key="certificate.certificate_id"
        :certificate="certificate"
      />
      <div
        v-if="filteredCertificates.length === 0 && !loading"
        class="py-4 text-center text-gray-500"
      >
        No certificates found.
      </div>
      <div v-if="loading" class="py-4 text-center text-gray-500">Loading certificates...</div>
    </div>

    <PaginationBar v-model:page="currentPage" :total-pages="totalPages" />
  </div>
</template>

<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import CertificateCell from "@/components/CertificateCell.vue";
// import IconClose from "@/components/icons/IconClose.vue"; // Không còn dùng
// import IconEdit from "@/components/icons/IconEdit.vue"; // Không còn dùng
// import IconPlus from "@/components/icons/IconPlus.vue"; // Có thể dùng sau
import PaginationBar from "@/components/PaginationBar.vue";
import { PUBLIC_API } from "@/services/main";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

interface Certificate {
  certificate_id: number;
  certificate_status: boolean;
  participant_name: string;
  exam_name: string;
  exam_address: string;
}

const certificates = ref<Certificate[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const loading = ref(false);
const searchQuery = ref("");
const router = useRouter();

const filteredCertificates = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return certificates.value.filter(
    (cert) =>
      cert.participant_name.toLowerCase().includes(query) ||
      cert.exam_name.toLowerCase().includes(query) ||
      cert.exam_address.toLowerCase().includes(query) ||
      cert.certificate_id.toString().includes(query),
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredCertificates.value.length / itemsPerPage.value),
);

const displayedCertificates = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredCertificates.value.slice(startIndex, endIndex);
});

watch(currentPage, () => {
  window.scrollTo(0, 0);
});

watch(searchQuery, () => {
  currentPage.value = 1;
});

onMounted(async () => {
  loading.value = true;
  try {
    const res = await fetch(`${PUBLIC_API}/certificates`, {
      mode: "cors",
      credentials: "include",
    });

    if (res.status === 200) {
      certificates.value = await res.json();
    } else {
      console.error("Failed to fetch certificates:", res.json());
    }
  } catch (error) {
    console.error("Error fetching certificates:", error);
  } finally {
    loading.value = false;
  }
});
</script>
