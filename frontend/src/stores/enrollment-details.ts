import { defineStore } from "pinia";

interface EnrollmentDetails {
  id: number;
  name: string;
  number: string;
  result?: number;
  certificate?: {
    name: string;
    received: boolean;
  };
  customer: {
    name: string;
    phone: string;
    role: string;
  };
  exam: {
    name: string;
    startTime: string;
    endTime: string;
    location: string;
  };
  extensions: {
    date: string;
    type: string;
  }[];
}

/**
 * The store to hold which enrollment the user clicks to display for.
 */
export const useEnrollmentDetailsStore = defineStore("enrollment-details", {
  state: () => ({ enrollment: null as EnrollmentDetails | null }),
});
