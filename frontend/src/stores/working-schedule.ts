import { defineStore } from "pinia";

interface Schedule {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  price: number;
  count: number;
  slots: number;
}

/**
 * Represents the state that holds what schedules are currently selected in the context.
 *
 * The one handling participants should be extremely careful dealing with this as it handles
 * the data transfer between schedulings and participants.
 */
export const useWorkingSchedulesStore = defineStore("working-schedules", {
  state: () => ({ schedules: [] as Schedule[] }),
  actions: {
    toggleSchedule(schedule: Schedule) {
      if (this.schedules.some((node) => node.id == schedule.id)) {
        this.schedules = this.schedules.filter((node) => node.id != schedule.id);
      } else {
        this.schedules.push(schedule);
      }
    },
  },
});
