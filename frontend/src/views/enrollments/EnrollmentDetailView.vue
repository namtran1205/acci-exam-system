<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import EnrollmentDetails from "@/components/EnrollmentDetails.vue";
import ErrorOverlay from "@/components/ErrorOverlay.vue";
import IconCertificate from "@/components/icons/IconCertificate.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconHistory from "@/components/icons/IconHistory.vue";
import IconSend from "@/components/icons/IconSend.vue";
import LoadingPopup from "@/components/LoadingPopup.vue";
import TextField from "@/components/TextField.vue";
import { makeJsonHeader, PUBLIC_API } from "@/services/main";
import { useEnrollmentDetailsStore } from "@/stores/enrollment-details";
import { useProfileStore } from "@/stores/profile";
import { useWorkingCertificateStore } from "@/stores/working-certificate";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const profile = useProfileStore();
const router = useRouter();
const workingEnrollment = useEnrollmentDetailsStore();

const loading = ref(false);
const errorTitle = ref("");
const errorMessage = ref("");

const examScore = ref("");
const currentCertificate = useWorkingCertificateStore();

onMounted(async () => {
  await profile.retrieveData();

  if (!profile.role) {
    router.replace({ path: "/" });
    return;
  }

  examScore.value = workingEnrollment.enrollment?.result?.toString() || "";
  currentCertificate.certificate =
    currentCertificate.certificate || workingEnrollment.enrollment?.certificate?.name;
});

async function sendScores() {
  if (!workingEnrollment.enrollment) {
    return;
  }

  loading.value = true;
  const res = await fetch(`${PUBLIC_API}/enrollments/result`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: makeJsonHeader(),
    body: JSON.stringify({
      id: workingEnrollment.enrollment!.id,
      score: examScore.value,
      certificate: currentCertificate.certificate,
    }),
  });

  loading.value = false;
  switch (res.status) {
    case 404:
      errorTitle.value = "Not Found";
      errorMessage.value = "Enrollment ID doesn't exist. Is this an old snapshot?";
      break;
    case 200:
    case 201:
      workingEnrollment.enrollment = null;
      currentCertificate.certificate = undefined;
      router.back();
  }
}
</script>

<template>
  <LoadingPopup v-if="loading" />
  <ErrorOverlay v-model:error="errorTitle" v-model:message="errorMessage" />

  <div class="flex w-full flex-col gap-4">
    <h1 class="text-center text-2xl font-bold">Enrollment Details</h1>

    <BackButton />

    <EnrollmentDetails />

    <template v-if="profile.role == 'data'">
      <TextField label="Exam Score" v-model="examScore" placeholder="20" />

      <div class="flex w-full flex-col gap-2">
        <span class="font-semibold">Certificate</span>

        <div
          v-if="!currentCertificate.certificate"
          class="bg-almost-white border-live-olive flex min-h-24 w-full items-center justify-center rounded-lg border"
        >
          No certificate
        </div>
        <div
          v-else
          class="bg-almost-white border-live-olive flex h-12 w-full flex-row items-center gap-5 rounded-lg border px-4 py-2"
        >
          <div class="bg-leaf flex size-8 items-center justify-center rounded-full">
            <IconCertificate class="size-4 fill-black" />
          </div>

          <span class="font-semibold">{{ currentCertificate.certificate }}</span>
        </div>
      </div>

      <div class="flex w-full flex-row items-center justify-end gap-2">
        <button
          class="bg-moss flex cursor-pointer flex-row items-center gap-2 rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r disabled:cursor-not-allowed disabled:opacity-50"
          @click="$router.push({ path: '/enrollments/certificate' })"
          :disabled="currentCertificate.certificate != null"
        >
          <IconCertificate class="size-5 fill-white" />
          Add Certificate
        </button>

        <button
          class="bg-moss flex cursor-pointer flex-row items-center gap-2 rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r"
          @click="sendScores"
        >
          <IconSend class="size-5 fill-white" />
          Save & Send
        </button>
      </div>
    </template>

    <template v-else-if="profile.role == 'acceptance'">
      <div class="flex w-full flex-row items-center justify-end gap-2">
        <button
          class="bg-moss flex cursor-pointer flex-row items-center gap-2 rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r"
          @click="$router.push({ path: '/enrollments/extend' })"
        >
          <IconHistory class="size-5 fill-white" />
          Add Extensions
        </button>

        <button
          class="bg-red flex cursor-pointer flex-row items-center gap-2 rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r"
        >
          <IconDelete class="size-5 fill-white" />
          Delete
        </button>
      </div>
    </template>
  </div>
</template>
