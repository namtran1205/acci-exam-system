<script setup lang="ts">
defineProps<{
  label: string; // The label of the input.
  input?: string; // The input type of the field.
  placeholder?: string; // Whether to display placeholder, optional
  readonly?: boolean; // Whether to display the field as unmodifiable
  large?: boolean; // Whether to render the field larger like a textarea
}>();

const model = defineModel<string>();
</script>

<template>
  <label class="flex w-full flex-col items-start gap-2">
    <span class="font-semibold">{{ label }}</span>

    <div
      :class="{
        'border-live-olive flex min-h-12 w-full flex-row gap-2 rounded-lg border-[1px] p-4': true,
        'cursor-not-allowed bg-black/25': readonly,
        'bg-white': !readonly,
        'min-h-24 items-start overflow-y-scroll': large,
      }"
    >
      <input
        :type="input || 'text'"
        :placeholder
        :readonly
        v-model="model"
        v-if="!large"
        class="size-full text-black outline-none placeholder:text-black/50"
      />

      <textarea
        :placeholder
        :readonly
        v-model="model"
        v-else
        class="size-full resize-none text-black outline-none placeholder:text-black/50"
      >
      </textarea>

      <slot></slot>
    </div>
  </label>
</template>
