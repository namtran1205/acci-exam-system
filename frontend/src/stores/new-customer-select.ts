import { defineStore } from "pinia";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: "individual" | "organization";
}

export const useNewCustomerSelect = defineStore("new-customer-select", {
  state: () => ({ customer: undefined as Customer | undefined }),
});
