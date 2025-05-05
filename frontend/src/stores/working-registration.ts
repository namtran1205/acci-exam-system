import { defineStore } from "pinia";

interface Registration {
  customer: {
    id: number;
    name: string;
    phone: string;
    role: "individual" | "organization";
  };
  registrations: {
    id: number;
  };
  participants: {
    id: number;
    name: string;
    gender: "male" | "female" | "nonbinary" | "idiot";
  }[];
}

export const useRegistrationStore = defineStore("registration", {
  state: () => ({ registration: undefined as Registration | undefined }),
});
