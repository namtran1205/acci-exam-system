<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import ExaminationCell from "@/components/ExaminationCell.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import PaginationBar from "@/components/PaginationBar.vue";
import { PUBLIC_API } from "@/services/main";
import { computed, onMounted, ref } from "vue";
import { useEditingScheduleStore } from "@/stores/working-schedule";
import { useRouter, useRoute } from "vue-router";

const editingSchedules = useEditingScheduleStore();
const router = useRouter();
const route = useRoute();

const isSingleSelection = computed(() => route.query.mode === "single");

async function fetchSchedules(page: number = 1) {
  const res = await fetch(`${PUBLIC_API}/schedules?page=${page}`, {
    mode: "cors",
    credentials: "include",
  });

  if (res.status == 200) return await res.json();
  else return null;
}

interface Schedule {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  price: number;
  count: number;
  slots: number;
}

const data = ref<Schedule[]>([]);
const page = ref(1);
const totalPages = ref(1);
const editMode = ref(false);

const displayedData = computed(() =>
  data.value.slice((page.value - 1) * 5, (page.value - 1) * 5 + 5),
);

onMounted(async () => {
  // Fetch the enrollments data.
  const firstPage = await fetchSchedules();
  data.value = [...firstPage.results];

  let current = firstPage.page;
  totalPages.value = firstPage.totalPages;

  while (current < totalPages.value) {
    await fetchSchedules(++current).then((next) => (data.value = [...data.value, ...next.results]));
  }
});

const selectSchedule = (schedule: Schedule) => {
  if (isSingleSelection.value) {
    // Single selection: Store in editingScheduleStore and redirect
    editingSchedules.schedule = schedule;
    router.push("/enrollments/extend");
  }
};
</script>

<template>
  <div class="flex w-full flex-col gap-3">
    <h2 class="text-center text-2xl font-bold">Examination Scheduling</h2>

    <button
      @click="editMode = false"
      v-if="editMode"
      class="bg-red flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r"
    >
      <IconClose class="size-3 fill-white" />
      Cancel
    </button>
    <div class="flex w-full flex-row items-center justify-between" v-else>
      <BackButton />

      <div class="flex flex-row items-center gap-2">
        <RouterLink
          to="/schedules/new"
          class="bg-leaf flex flex-row items-center gap-2 rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r"
        >
          <IconPlus class="size-5 fill-white" />
          New
        </RouterLink>

        <button
          class="bg-leaf flex cursor-pointer flex-row items-center gap-2 rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r"
          @click="editMode = true"
        >
          <IconEdit class="size-5 fill-white" />
          Edit
        </button>
      </div>
    </div>

    <div
      class="bg-almost-white border-live-olive divide-live-olive flex min-h-[19.5rem] w-full flex-col divide-y-[1px] rounded-lg border-[1px]"
    >
      <ExaminationCell
        v-for="schedule in displayedData"
        :schedule="schedule"
        :edit-mode="editMode"
        @click="selectSchedule(schedule)"
      />
    </div>

    <PaginationBar v-model:page="page" :total-pages="totalPages" />
  </div>
</template>
