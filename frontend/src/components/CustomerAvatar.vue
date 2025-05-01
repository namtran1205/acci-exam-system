<!-- components/CustomerAvatar.vue -->
<template>
  <div
    class="mr-3 flex h-8 w-8 items-center justify-center rounded-full"
    :class="customerType === 'Individual' ? 'bg-transparent' : 'bg-lime-500 text-white'"
  >
    <IconIndividual
      v-if="customerType === 'Individual'"
      class="h-8 w-8"
      alt="Individual Avatar"
    />
    <IconOrganization
      v-else
      class="h-8 w-8"
      alt="Organization Avatar"
    />
  </div>
</template>

<script setup lang="ts">
    import IconIndividual from './icons/IconIndividual.vue';
    import IconOrganization from './icons/IconOrganization.vue';
    defineProps<{
    customerType: 'Individual' | 'Organization';
    }>();
</script>