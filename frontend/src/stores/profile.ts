import { defineStore } from "pinia";

interface ProfileState {
  name?: string;
}

/**
 * The profile store holding the current employee's name for this session.
 */
export const useProfileStore = defineStore("profile", {
  state: () => ({ name: undefined }) as ProfileState,
});
