<template>
  <button
      class="bg-moss hover:bg-leaf flex items-center justify-center cursor-pointer rounded-md bg-lime-500 px-3 py-1 text-white"
      @click="onClick" style="max-height: 30px; min-width: 80px;"
    >
      <template v-if="iconType">
        <IconSave v-if="iconType === 'Save'" class="mr-2" />
        <span v-else-if="iconType === 'New'" class="mr-2">+</span>
        <IconImport v-else-if="iconType === 'Import'" class="mr-2" />
      </template>

      <span>{{ buttonText }}</span>
      
    </button>
  </template>

<script setup lang="ts">
import IconSave from './icons/IconSave.vue';
import IconImport from './icons/IconImport.vue';

const props = defineProps<{
  onClick: () => void;
  iconType?: string;
  buttonText: string;
}>();

function handleClick() {
  props.onClick();
}
</script>
