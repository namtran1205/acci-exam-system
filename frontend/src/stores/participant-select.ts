import { defineStore } from "pinia";

interface Participant {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  registrationId: number;
}

export const useParticipantSelect = defineStore("participant-select", {
  state: () => ({ participant: undefined as Participant | undefined }),
});
