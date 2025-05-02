<!-- components/CustomerAvatar.vue -->
<script setup lang="ts">
import IconIndividual from "./icons/IconIndividual.vue";
import IconOrganization from "./icons/IconOrganization.vue";

defineProps<{
  role: "individual" | "organization";
}>();
</script>

<template>
  <div
    class="mr-3 flex h-8 w-8 items-center justify-center rounded-full"
    :class="role === 'individual' ? 'bg-transparent' : 'bg-leaf text-white'"
  >
    <IconIndividual v-if="role === 'individual'" class="h-8 w-8" alt="Individual Avatar" />
    <IconOrganization v-else class="h-8 w-8" alt="Organization Avatar" />
  </div>
</template>
