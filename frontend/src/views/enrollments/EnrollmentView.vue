<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import EnrollmentCell from "@/components/EnrollmentCell.vue";
import PaginationBar from "@/components/PaginationBar.vue";
import SearchBox from "@/components/SearchBox.vue";
import { PUBLIC_API } from "@/services/main";
import { computed, onMounted, ref } from "vue";

async function fetchEnrollments(page: number = 1) {
  const res = await fetch(`${PUBLIC_API}/enrollments?page=${page}`, {
    mode: "cors",
    credentials: "include",
  });

  if (res.status == 200) return await res.json();
  else return null;
}

const data = ref<any[]>([]);
const page = ref(1);
const totalPages = ref(1);

const displayedData = computed(() =>
  data.value.slice((page.value - 1) * 5, (page.value - 1) * 5 + 5),
);

onMounted(async () => {
  // Fetch the enrollments data.
  const firstPage = await fetchEnrollments();
  data.value = [...firstPage.results];

  let current = firstPage.page;
  totalPages.value = firstPage.totalPages;

  while (current < totalPages.value) {
    await fetchEnrollments(++current).then(
      (next) => (data.value = [...data.value, ...next.results]),
    );
  }
});
</script>

<template>
  <div class="flex w-full flex-col gap-3">
    <h2 class="text-center text-2xl font-bold">Takers Registration</h2>

    <BackButton />

    <SearchBox placeholder="Search exam takers..." />

    <div
      class="bg-almost-white border-live-olive divide-live-olive flex min-h-[19.5rem] w-full flex-col divide-y-[1px] rounded-lg border-[1px]"
    >
      <EnrollmentCell v-for="enrollment in displayedData" :data="enrollment" />
    </div>

    <PaginationBar v-model:page="page" :total-pages="totalPages" />
  </div>
</template>
