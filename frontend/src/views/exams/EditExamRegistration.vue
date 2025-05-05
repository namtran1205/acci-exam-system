<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CustomerAvatar from "@/components/CustomerAvatar.vue";
import FormField from "@/components/FormField.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconIndividual from "@/components/icons/IconIndividual.vue";
import SearchBox from "@/components/SearchBox.vue";
import { PUBLIC_API } from "@/services/main";
import { useNewCustomerSelect } from "@/stores/new-customer-select";
import { useParticipantSelect } from "@/stores/participant-select";
import { useRegistrationStore } from "@/stores/working-registration";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import IconEdit from "../../components/icons/IconEdit.vue";

const router = useRouter();

const workingRegistration = useRegistrationStore();
const selectedCustomer = useNewCustomerSelect();

const showDropdown = ref(false);

const selectCustomer = (c: any) => {
  showDropdown.value = false;
};

const date = ref(new Date().toISOString().split("T")[0]);
const registration = ref<any>(workingRegistration.registration);
const registrationId = computed(() => registration.value?.registrations.id);
const searchQuery = ref("");
const participants = ref<any[]>(registration.value?.participants || []);

const countParticipants = computed(() => participants.value.length);

const filteredParticipants = computed(() => {
  if (!searchQuery.value) return participants.value;

  const query = searchQuery.value.toLowerCase();
  return participants.value.filter(
    (participant) =>
      participant.name.toLowerCase().includes(query) || participant.id.toString().includes(query),
  );
});

const redirectToEditCustomer = (customer: any) => {
  router.push({ path: `/customers/edit` });
};

const participantSelect = useParticipantSelect();

const redirectEditParticipant = (participant: any) => {
  participantSelect.participant = participant;
  router.push({ path: `/customers/edit` });
};

const handleRemoveParticipant = (id: number) => {
  participants.value = participants.value.filter((p) => p.id !== id);
};

async function Save() {
  console.log("Save button clicked");
  // Add your save logic here

  // Redirect to the desired page after saving
  router.push({ path: "/exams" });
}

onMounted(async () => {
  if (!workingRegistration.registration) {
    router.replace({ path: "/exams" });
    return;
  }

  const res = await fetch(
    `${PUBLIC_API}/participants?id=${workingRegistration.registration?.registrations.id}`,
    {
      mode: "cors",
      credentials: "include",
    },
  );

  if (res.status == 200) {
    participants.value = [...(await res.json())];
  }
});
</script>

<template>
  <div class="relative flex flex-col">
    <h1 class="mb-8 text-center text-3xl font-bold">Edit Exam Registration</h1>

    <div class="flex items-center justify-between">
      <BackButton />
      <BaseButton iconType="Save" buttonText="Save" @click="Save" />
    </div>

    <!-- Registration ID-->
    <FormField class="mb-4" label="Registration ID">
      <input
        type="text"
        placeholder="Registration ID"
        :value="registrationId"
        class="w-full rounded-md border border-transparent bg-gray-200 px-4 py-2 focus:border-transparent focus:outline-none"
        readonly
      />
    </FormField>

    <!-- Registed to -->
    <FormField class="mb-4" label="Registered to">
      <div
        class="flex min-h-12 w-full items-center justify-between px-4 py-2"
        v-if="registration?.customer"
      >
        <div class="flex items-center">
          <CustomerAvatar :role="registration.customer.role" class="mr-3" />
          <div>
            <div class="font-medium">{{ registration.customer.name }}</div>
            <div class="text-sm text-gray-600">{{ registration.customer.phone }}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <IconEdit
            class="h-5 w-5 cursor-pointer fill-black transition-transform duration-200 hover:scale-120"
            @click="redirectToEditCustomer(selectedCustomer.customer)"
          />
        </div>
      </div>
    </FormField>

    <!-- Date -->
    <FormField class="mb-4" label="Date">
      <input
        type="text"
        v-model="date"
        placeholder="YYYY-MM-DD"
        class="w-full rounded border border-transparent px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-transparent focus:outline-none"
        readonly
      />
    </FormField>

    <!-- Participants -->
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold">Participants ({{ countParticipants }})</p>
        <div className="flex gap-1">
          <BaseButton
            iconType="New"
            buttonText="New"
            @click="$router.push({ path: '/exams/new/participant' })"
          />
        </div>
      </div>

      <SearchBox placeholder="Search participants..." v-model="searchQuery" class="mb-2" />

      <FormField class="mb-4">
        <div
          v-for="participant in filteredParticipants"
          :key="participant.id"
          class="border-leaf flex cursor-pointer items-center justify-between border-b px-4 py-2 last:border-b-0"
        >
          <div class="flex items-center">
            <IconIndividual class="mr-3" />

            <div>
              <div class="font-bold">ID {{ participant.id }}</div>
              <div class="text-sm">{{ participant.name }}</div>
              <div class="text-sm text-gray-600">
                <!-- So bai du thi -->
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <IconEdit
              class="h-5 w-5 cursor-pointer text-gray-600 transition-transform duration-200 hover:scale-120"
              @click="redirectEditParticipant(participant)"
            />
            <IconClose
              class="size-3 cursor-pointer fill-black transition-transform duration-200 hover:scale-120"
              @click="handleRemoveParticipant(participant.id)"
            />
          </div>
        </div>
      </FormField>
    </div>
  </div>
</template>
