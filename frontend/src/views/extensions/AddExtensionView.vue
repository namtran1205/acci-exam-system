<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import ErrorOverlay from "@/components/ErrorOverlay.vue";
import FormField from "@/components/FormField.vue";
import IconCheckmark from "@/components/icons/IconCheckmark.vue";
import IconLoad from "@/components/icons/IconLoad.vue";
import IconSchedule from "@/components/icons/IconSchedule.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import TextField from "@/components/TextField.vue";
import { PUBLIC_API } from "@/services/main";
import { useEnrollmentDetailsStore } from "@/stores/enrollment-details";
import { useEditingScheduleStore } from "@/stores/working-schedule";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const extensionType = ref("regular");
const proofType = ref("");
const proofInformation = ref("");

const error = ref("");
const errorMessage = ref("");

// store đang giữ schedule được chọn
const schedule = useEditingScheduleStore();
const enrollmentStore = useEnrollmentDetailsStore();
const currentEnrollment = computed(() => enrollmentStore.enrollment);

onMounted(() => {
  console.log(currentEnrollment.value);
});

const redirectToSchedulesSelect = () => {
  router.push("/schedules?mode=single");
};

// Handle saving the extension via API
async function Save() {
  if (!schedule.schedule?.id || !currentEnrollment.value?.id) {
    console.error("Schedule ID or Enrollment ID is missing.");
    return;
  }

  const payload: any = {
    enrollmentId: currentEnrollment.value.id,
    scheduleId: schedule.schedule?.id,
  };

  if (extensionType.value === "special") {
    if (!proofType.value || !proofInformation.value) {
      console.error("Proof Type and Proof Information are required for special extension.");
      return;
    }
    payload["proofType"] = proofType.value;
    payload["proofInfo"] = proofInformation.value;
  }

  try {
    const response = await fetch(`${PUBLIC_API}/extensions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
      mode: "cors",
    });

    const body = await response.json();
    switch (response.status) {
      case 400:
        error.value = "Invalid Data";
        errorMessage.value =
          "Some data is invalid when submitting. Are you sure you're not winging it?";
        break;
      case 409:
        error.value = "Invalid State";
        errorMessage.value = body.message;
        break;
      case 201:
        error.value = "";
        router.replace({ path: "/enrollments/details" });
        break;
    }
  } catch (error) {
    console.error("An error occurred while saving the extension:", error);
  }
}
</script>

<template>
  <ErrorOverlay v-model:error="error" v-model:message="errorMessage" />

  <div class="flex w-full flex-col gap-4">
    <h1 class="text-center text-2xl font-bold">Add Extension</h1>

    <BackButton />

    <RadioGroup
      label="Extension Type"
      name="extension-type"
      :choices="['Regular', 'Special']"
      v-model="extensionType"
    />

    <div class="flex w-full flex-col gap-2">
      <span class="font-semibold">Postponing to</span>
      <FormField>
        <div v-if="schedule.schedule" class="w-full space-y-1">
          <div class="border-b px-4 py-2 last:border-b-0">
            <div class="flex justify-between">
              <div class="flex">
                <div class="flex items-center">
                  <IconSchedule class="mr-3 self-center" />
                </div>
                <div>
                  <h3 class="font-bold">{{ schedule.schedule.name }}</h3>
                  <p class="text-sm">
                    {{ new Date(schedule.schedule.startTime).toLocaleDateString() }}
                  </p>
                  <p class="text-sm">
                    {{ new Date(schedule.schedule.startTime).toLocaleTimeString() }} -
                    {{ new Date(schedule.schedule.endTime).toLocaleTimeString() }}
                  </p>
                  <p class="text-sm text-gray-500">{{ schedule.schedule.location }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <button class="text-gray-500 hover:text-gray-700">
                  <IconLoad
                    class="h-5 w-5 cursor-pointer text-gray-600 transition-transform duration-200 hover:scale-120"
                    style="fill: black"
                    @click="redirectToSchedulesSelect"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <button
            class="bg-almost-white flex h-20 w-full flex-row items-center justify-center rounded-lg border-transparent from-black/10 to-black/10 px-4 py-2 text-lg font-semibold hover:bg-gradient-to-r"
            @click="redirectToSchedulesSelect"
          >
            Select a Schedule
          </button>
        </div>
      </FormField>
    </div>

    <TextField
      label="Proof Type"
      placeholder="Doctor's Note"
      v-if="extensionType == 'special'"
      v-model="proofType"
    />

    <TextField
      label="Proof Information"
      placeholder="Routine Chemotherapy, Doctor James Wilson (Head of Oncology), Princeton-Plainsboro Teaching Hospital"
      v-if="extensionType == 'special'"
      v-model="proofInformation"
      large
    />

    <button
      class="bg-moss flex w-fit cursor-pointer items-center gap-2 self-end rounded-lg px-4 py-2 font-semibold text-white"
      @click="Save"
    >
      <IconCheckmark class="size-5 fill-white" />
      Accept
    </button>
  </div>
</template>
