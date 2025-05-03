<script setup lang="ts">
import IconError from "./icons/IconError.vue";

const errorModel = defineModel<string | undefined>("error");
const messageModel = defineModel<string | undefined>("message");

function close() {
  errorModel.value = "";
  messageModel.value = "";
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex size-full items-center justify-center bg-black/25 p-6"
    v-if="messageModel && errorModel"
    @click.stop="close"
  >
    <div
      class="bg-almost-white flex w-full flex-col items-center gap-12 rounded-2xl p-6 shadow lg:w-1/3"
    >
      <IconError class="fill-red size-12" />

      <div class="flex w-full flex-col items-center gap-2 text-center">
        <h2 class="text-red text-3xl font-semibold">{{ errorModel }}</h2>
        <p class="text-lg">{{ messageModel }}</p>
      </div>

      <button
        @click="close"
        class="bg-red hover:ring-red w-fit cursor-pointer rounded-lg px-8 py-2 font-semibold text-white duration-200 hover:ring-2"
      >
        OK
      </button>
    </div>
  </div>
</template>
