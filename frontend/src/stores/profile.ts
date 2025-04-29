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
  },
});
