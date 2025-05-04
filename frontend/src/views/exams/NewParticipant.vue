<script setup lang="ts">
import { useWorkingSchedulesStore } from "@/stores/working-schedule";
import BackButton from "@/components/BackButton.vue";
import FormField from "@/components/FormField.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import { computed, handleError, ref } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import IconSchedule from "@/components/icons/IconSchedule.vue";
import IconClose from "@/components/icons/IconClose.vue";
import { PUBLIC_API } from "@/services/main";

const router = useRouter();

const participant = ref({
  name: "",
  dateOfBirth: "",
  gender: "",
  registrationId: -1,
});

interface Enrollment {
  id: number;
  scheduleId: number;
  participantId: number;
  number: number;
  status: "pending" | "cancelled";
}

const enrollments = ref<Enrollment[]>([]);

const selectedList = useWorkingSchedulesStore();

const redirectToSchedulesSelect = () => {
  router.push({ name: "Exam Schedules" });
};

async function Save() {
  console.log("Save button clicked");
  // Add your save logic here

  // Redirect to the desired page after saving
  router.push({ name: "New Exam Registration" });
}

function handleRemoveSchedule(scheduleId: number) {
  selectedList.schedules = selectedList.schedules.filter((schedule) => schedule.id !== scheduleId);
  console.log(`Removed schedule with ID: ${scheduleId}`);
}
</script>

<template>
  <div class="relative flex flex-col">
    <h1 class="mb-8 text-center text-3xl font-bold">New Exam Registration</h1>

    <div class="flex items-center justify-between">
      <BackButton />
    </div>

    <!-- Registed to -->
    <FormField class="mb-4" label="Participant Name">
      <input
        type="text"
        placeholder="Participant Name"
        v-model="participant.name"
        class="w-full rounded-md border border-transparent bg-transparent px-4 py-2 focus:border-transparent focus:outline-none"
      />
    </FormField>

    <!-- Date of Birth -->
    <FormField class="mb-4" label="Date of Birth">
      <input
        type="date"
        placeholder="Date of Birth"
        v-model="participant.dateOfBirth"
        class="w-full rounded-md border border-transparent bg-transparent px-4 py-2 focus:border-transparent focus:outline-none"
      />
    </FormField>

    <!-- Gender -->
    <RadioGroup
      label="Gender"
      name="gender"
      v-model="participant.gender"
      :choices="['Male', 'Female', 'Other']"
      class="mb-4"
    />

    <!-- Examination Schedule -->
    <div class="mb-4">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold">Examination Schedule</p>
        <div className="flex gap-1">
          <BaseButton iconType="Add" buttonText="Add" @click="redirectToSchedulesSelect" />
        </div>
      </div>
      <FormField>
        <div v-if="selectedList.schedules.length === 0" class="text-center">
          <div class="mb-2 flex justify-center">
            <img
              src="/newparticipant_no_examination.png"
              alt="No examinations"
              class="h-auto w-24 opacity-50"
            />
          </div>
          <p class="text-gray-500">No examinations yet...</p>
        </div>

        <div v-else class="w-full space-y-1">
          <div
            v-for="schedule in selectedList.schedules"
            :key="schedule.id"
            class="border-b px-4 py-2 last:border-b-0"
          >
            <div class="flex justify-between">
              <div class="flex">
                <div class="flex items-center">
                  <IconSchedule class="mr-3 self-center" />
                </div>
                <div>
                  <h3 class="font-bold">ID {{ schedule.name }}</h3>
                  <p class="text-sm">{{ new Date(schedule.startTime).toLocaleDateString() }}</p>
                  <p class="text-sm">
                    {{ new Date(schedule.startTime).toLocaleTimeString() }} -
                    {{ new Date(schedule.endTime).toLocaleTimeString() }}
                  </p>
                  <p class="text-sm text-gray-500">{{ schedule.location }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <div class="flex items-center">
                  <span class="text-moss mr-2 font-bold">
                    {{ schedule.count }} / {{ schedule.slots }}
                  </span>
                </div>
                <button class="text-gray-500 hover:text-gray-700">
                  <IconClose
                    class="h-3 w-3"
                    style="fill: black"
                    @click="handleRemoveSchedule(schedule.id)"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </FormField>
    </div>

    <div class="flex justify-end">
      <BaseButton iconType="Save" buttonText="Save" @click="Save" />
    </div>
  </div>
</template>
