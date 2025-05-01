<script setup lang="ts">
import IconLogout from "@/components/icons/IconLogout.vue";
import IconTickChecklist from "@/components/icons/IconTickChecklist.vue";
import { PUBLIC_API } from "@/services/main";
import { useProfileStore } from "@/stores/profile";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const profile = useProfileStore();
const router = useRouter();

const loading = ref(true);

async function fetchProfile() {
  const res = await fetch(`${PUBLIC_API}/profiles`, {
    credentials: "include",
  });

  // Go to login.
  if (res.status != 200) {
    router.replace({ path: "/login" });
    return;
  }

  const data = await res.json();
  profile.name = data.name;
  profile.role = data.role;
}

onMounted(async () => {
  // Fetch to see how our profile is going and put in our store.
  await fetchProfile();
  loading.value = false;
});

async function logout() {
  console.log(
    await fetch(`${PUBLIC_API}/logout`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    }),
  );
  router.replace({ path: "/login" });
}
</script>

<template>
  <div class="w-full animate-pulse" v-if="loading">Loading...</div>

  <div class="flex w-full flex-col" v-else>
    <span class="w-full justify-self-end text-right font-semibold"
      >Welcome back,
      <span class="text-leaf hover:text-moss underline">{{ profile.name }}</span></span
    >

    <div class="mt-32 flex w-full flex-col gap-6 font-semibold text-white">
      <div class="flex w-full flex-col gap-2">
        <RouterLink
          to="/enrollments"
          class="bg-moss flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-white"
        >
          <IconTickChecklist class="size-5 fill-white" />
          <span class="font-semibold">Takers Registration</span>
        </RouterLink>
      </div>

      <button
        class="bg-red flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2"
        @click="logout"
      >
        <IconLogout class="size-5 fill-white" />
        Logout
      </button>
    </div>
  </div>
</template>
