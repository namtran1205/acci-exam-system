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

export const useParticipantListSelect = defineStore("participant-list-select", {
  state: () => ({
    participants: [] as Participant[],
  }),
  actions: {
    toggle(participant: Participant) {
      if (this.participants.some((node) => node.id == participant.id)) {
        this.participants = this.participants.filter((node) => node.id != participant.id);
      } else {
        this.participants.push(participant);
      }
    },
  },
});
