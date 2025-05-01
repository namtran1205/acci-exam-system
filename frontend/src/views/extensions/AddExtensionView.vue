<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import IconCheckmark from "@/components/icons/IconCheckmark.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import TextField from "@/components/TextField.vue";
import { ref } from "vue";

const extensionType = ref("regular");
const proofType = ref("");
const proofInformation = ref("");
</script>

<template>
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

      <button
        class="border-live-olive bg-almost-white flex h-20 flex-row items-center justify-center rounded-lg border-[1px] text-lg font-semibold"
      >
        Select a Schedule
      </button>
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
      class="bg-moss flex w-fit items-center gap-2 self-end rounded-lg px-4 py-2 font-semibold text-white"
    >
      <IconCheckmark class="size-5 fill-white" />
      Accept
    </button>
  </div>
</template>
