<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import IconSave from "@/components/icons/IconSave.vue";
import TextField from "@/components/TextField.vue";
import { useWorkingCertificateStore } from "@/stores/working-certificate";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const certificateType = ref("");
const workingCertificate = useWorkingCertificateStore();

onMounted(() => {
  certificateType.value = workingCertificate.certificate || "";
});

function save() {
  workingCertificate.certificate = certificateType.value;
  router.back();
}
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <h1 class="text-center text-2xl font-bold">Add Certificate</h1>

    <BackButton />

    <TextField label="Certificate Type" placeholder="HSK 6" v-model="certificateType" />

    <button
      class="bg-moss flex cursor-pointer flex-row items-center gap-2 self-end rounded-lg from-black/25 to-black/25 px-4 py-2 font-semibold text-white hover:bg-gradient-to-r disabled:cursor-not-allowed disabled:opacity-50"
      @click="save"
    >
      <IconSave class="size-5 fill-white" />
      Save
    </button>
  </div>
</template>
