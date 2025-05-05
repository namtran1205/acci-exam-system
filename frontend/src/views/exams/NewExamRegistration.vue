<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import CustomerAvatar from "@/components/CustomerAvatar.vue";
import FormField from "@/components/FormField.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconIndividual from "@/components/icons/IconIndividual.vue";
import SearchBox from "@/components/SearchBox.vue";
import { useNewCustomerSelect } from "@/stores/new-customer-select";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import IconEdit from "../../components/icons/IconEdit.vue";
import IconLoad from "../../components/icons/IconLoad.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useParticipantSelect, useParticipantListSelect } from "@/stores/participant-select";
import { PUBLIC_API } from "@/services/main";

const router = useRouter();

const selectedCustomer = useNewCustomerSelect();

const participantListSelect = useParticipantListSelect();

const showDropdown = ref(false);

const selectCustomer = (c: any) => {
  showDropdown.value = false;
};

const date = ref(new Date().toISOString().split("T")[0]);

const searchQuery = ref("");

interface Participant {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  registrationId: number;
}

const participants = ref<Participant[]>([
  {
    id: 1,
    name: "Nguyễn Phúc An",
    dateOfBirth: "2000-01-01",
    gender: "male",
    registrationId: 1,
  },
  {
    id: 2,
    name: "Nguyễn Hà Nam Trân",
    dateOfBirth: "2000-01-01",
    gender: "female",
    registrationId: 1,
    //examinations: 0,
  },
  {
    id: 3,
    name: "Trần Đan Huy",
    dateOfBirth: "2000-01-01",
    gender: "male",
    registrationId: 1,
  },
]);

const countParticipants = computed(() => participantListSelect.participants.length);

// const handleRemoveParticipant = (id: number) => {
//   participants.value = participants.value.filter((participant) => participant.id !== id);
// };

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

const redirectEditParticipant = (participant: Participant) => {
  participantSelect.participant = participant;
  router.push({ path: `/exams/new/participant/edit` });
};
function handleRemoveParticipant(id: number) {
  participantListSelect.participants = participantListSelect.participants.filter(
    (participant) => participant.id !== id,
  );
}

async function saveRegistration(customerId: number, billId?: number) {
  try {
    const response = await fetch(`${PUBLIC_API}/registrations/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, ...(billId ? { billId } : {}) }), // Chỉ gửi billId nếu có
    });

    if (!response.ok) {
      throw new Error("Failed to save registration");
    }

    const result = await response.json();
    console.log("Registration saved:", result);
  } catch (error) {
    console.error("Error saving registration:", error);
  }

  router.push({ path: "/exams" });
}

async function Save() {
  console.log("Save button clicked");
  // Add your save logic here

  // Redirect to the desired page after saving
  router.push({ path: "/exams" });
}
</script>

<template>
  <div class="relative flex flex-col">
    <h1 class="mb-8 text-center text-3xl font-bold">New Exam Registration</h1>

    <div class="flex items-center justify-between">
      <BackButton />
      <BaseButton
        iconType="Save"
        buttonText="Save"
        @click="() => saveRegistration(selectedCustomer.customer!.id)"
      />
    </div>

    <!-- Registed to -->
    <FormField class="mb-4" label="Registered to">
      <div
        class="flex min-h-12 w-full items-center justify-between px-4 py-2"
        v-if="selectedCustomer.customer"
      >
        <div class="flex items-center">
          <CustomerAvatar :role="selectedCustomer.customer.role" class="mr-3" />
          <div>
            <div class="font-medium">{{ selectedCustomer.customer.name }}</div>
            <div class="text-sm text-gray-600">{{ selectedCustomer.customer.phone }}</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <IconEdit
            class="h-5 w-5 cursor-pointer fill-black transition-transform duration-200 hover:scale-120"
            @click="redirectToEditCustomer(selectedCustomer.customer)"
          />

          <RouterLink to="/exams/new/customer">
            <IconLoad
              class="h-5 w-5 cursor-pointer text-gray-600 transition-transform duration-200 hover:scale-120"
              @click="$router.push({ path: '/exams/new/customer' })"
            />
          </RouterLink>
        </div>
      </div>

      <div
        class="flex min-h-24 cursor-pointer items-center justify-center px-4 py-2"
        v-else
        @click="$router.push({ path: '/exams/new/customer' })"
      >
        Click to select
      </div>
    </FormField>

    <!-- Date -->
    <FormField class="mb-4" label="Date">
      <div class="flex h-full w-full items-center justify-between">
        <input
          type="text"
          v-model="date"
          placeholder="YYYY-MM-DD"
          class="w-full rounded border border-transparent px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-transparent focus:outline-none"
          readonly
        />
      </div>
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
          v-for="participant in participantListSelect.participants"
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
              class="h-5 w-5 cursor-pointer fill-black transition-transform duration-200 hover:scale-120"
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
