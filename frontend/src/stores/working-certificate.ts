import { defineStore } from "pinia";

/**
 * Represents a store that holds data for the certificate selected on the data employee's screen.
 */
export const useWorkingCertificateStore = defineStore("working-certificate", {
  state: () => ({ certificate: undefined as string | undefined }),
});
