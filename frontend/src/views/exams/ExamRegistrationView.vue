<template>
  <div class="relative flex flex-col">
    <h1 class="mb-8 text-center text-3xl font-bold">Exam Registration</h1>

    <div class="flex flex-row items-center justify-between">
      <BackButton />
      <button
        @click="openNewRegistration"
        class="bg-moss flex flex-row items-center rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r"
      >
        <IconPlus class="size-5 fill-white" />
        New
      </button>
    </div>

    <SearchBox
      class="my-4"
      placeholder="Search exam registrations..."
      v-model="searchQuery"
      />

    <div class="bg-almost-white border-live-olive rounded-lg border">
      <div
        v-for="registration in filteredRegistrations"
        :key="registration.id"
        class="border-leaf flex cursor-pointer items-center justify-between border-b from-black/10 to-black/10 p-2 last:border-b-0 hover:bg-gradient-to-r"
      >
        <div class="flex items-center">
          <CustomerAvatar :role="registration.customer.role" class="mr-3" />
          <div>
            <div class="font-medium">ID {{ registration.registrations.id }}</div>
            <div class="text-sm text-gray-600">by {{ registration.customer.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import CustomerAvatar from "@/components/CustomerAvatar.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import SearchBox from "@/components/SearchBox.vue";
import { PUBLIC_API } from "@/services/main";
import { useRegistrationStore } from "@/stores/working-registration";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const registrations = ref<any[]>([]);
const searchQuery = ref("");

const workingRegistration = useRegistrationStore();
const router = useRouter();

const filteredRegistrations = computed(() => {
  if (!searchQuery.value) return registrations.value;

  const query = searchQuery.value.toLowerCase();
  return registrations.value.filter(
    (reg) =>
      reg.customer.name.toLowerCase().includes(query) ||
      reg.registrations.id.toString().includes(query),
  );
});

onMounted(async () => {
  const res = await fetch(`${PUBLIC_API}/registrations`, {
    mode: "cors",
    credentials: "include",
  });

  if (res.status != 200) {
    return;
  }

  registrations.value = [...(await res.json())];
});

function openNewRegistration() {
  router.push({ path: "/exams/new" });
}
</script>
