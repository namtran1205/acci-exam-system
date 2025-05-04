import { PUBLIC_API } from "@/services/main";
import { defineStore } from "pinia";

interface ProfileState {
  name?: string;
  role?: "acceptance" | "data" | "accounting" | "admin";
}

/**
 * The profile store holding the current employee's name for this session.
 */
export const useProfileStore = defineStore("profile", {
  state: () => ({ name: undefined }) as ProfileState,
  actions: {
    setName(name: string) {
      this.name = name;
    },
    async retrieveData() {
      if (this.name && this.role) {
        return;
      }

      const res = await fetch(`${PUBLIC_API}/profiles`, {
        mode: "cors",
        credentials: "include",
      });

      if (res.status == 200) {
        const profile = await res.json();
        this.name = profile.name;
        this.role = profile.role;
      }
    },
  },
});
