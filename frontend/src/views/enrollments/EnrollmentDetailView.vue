<script setup lang="ts">
import BackButton from "@/components/BackButton.vue";
import EnrollmentDetails from "@/components/EnrollmentDetails.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconHistory from "@/components/icons/IconHistory.vue";
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <h1 class="text-center text-2xl font-bold">Enrollment Details</h1>

    <BackButton />

    <EnrollmentDetails />

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
  </div>
</template>
