<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import CustomerAvatar from "@/components/CustomerAvatar.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import SearchBox from "@/components/SearchBox.vue";
import { PUBLIC_API } from "@/services/main";
import { useRegistrationStore } from "@/stores/working-registration";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import IconDetail from "@/components/icons/IconDetail.vue";
import PaginationBar from "@/components/PaginationBar.vue";
import BaseButton from "@/components/BaseButton.vue";

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

const redirectEditRegistration = (registration: any) => {
  workingRegistration.registration = registration;
  router.push({ path: `/exams/edit` });
};

function openNewRegistration() {
  router.push({ path: "/exams/new" });
}
</script>

<template>
  <div class="relative flex flex-col">
    <h1 class="mb-8 text-center text-3xl font-bold">Exam Registration</h1>

    <div class="flex flex-row items-center justify-between">
      <BackButton />
      <BaseButton iconType="New" buttonText="New" @click="openNewRegistration" />
    </div>

    <SearchBox class="my-4" placeholder="Search exam registrations..." v-model="searchQuery" />

    <div class="bg-almost-white border-live-olive rounded-lg border">
      <div
        v-for="registration in filteredRegistrations"
        :key="registration.id"
        class="border-leaf flex cursor-pointer items-center justify-between border-b from-black/10 to-black/10 px-4 py-2 last:border-b-0 hover:bg-gradient-to-r"
        @click="redirectEditRegistration(registration)"
      >
        <div class="flex items-center">
          <CustomerAvatar :role="registration.customer.role" class="mr-3" />
          <div>
            <div class="font-medium">ID {{ registration.registrations.id }}</div>
            <div class="text-sm text-gray-600">by {{ registration.customer.name }}</div>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <IconDetail
              class="h-4 w-4 cursor-pointer text-gray-600 transition-transform duration-200 hover:scale-120"
              style="fill: black"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
