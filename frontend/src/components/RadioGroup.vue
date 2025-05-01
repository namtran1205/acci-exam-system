<script setup lang="ts">
import slugify from "slugify";

defineProps<{
  label: string;
  name: string;
  choices: string[];
}>();

const current = defineModel<string>();
</script>

<template>
  <fieldset class="flex w-full flex-col gap-2 pt-2">
    <legend class="font-semibold">{{ label }}</legend>

    <label
      class="bg-almost-white border-live-olive hover:bg-live-olive/25 flex h-12 w-full flex-row items-center justify-start gap-2 rounded-lg border-[1px] px-4 duration-200"
      v-for="choice in choices"
    >
      <input
        type="radio"
        class="size-5 appearance-none rounded-full border-[1px] border-black"
        :name
        :value="slugify(choice, { lower: true, strict: true, trim: true })"
        :checked="current == slugify(choice, { lower: true, strict: true, trim: true })"
        @change="current = slugify(choice, { lower: true, strict: true, trim: true })"
      />

      {{ choice }}
    </label>
  </fieldset>
</template>

<style lang="css" scoped>
input:checked {
  background: radial-gradient(circle at center, #fbfafa 0%, #fbfafa 30%, #5d8736 30%, #5d8736 100%);
}
</style>
