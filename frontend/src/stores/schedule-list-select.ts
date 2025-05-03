// stores/selected-schedule-list.ts
import { defineStore } from 'pinia';

interface Schedule {
  id: number;
  startTime: Date;
  endTime: Date;
  location: string;
  name: string;
  price: number;
  slots: number;
  currentSlots: number;
}

export const useSelectedScheduleList = defineStore('schedule-list-select', {
  state: () => ({
    selectedSchedules: [] as Schedule[],
  }),
  actions: {
    addSchedule(schedule: Schedule) {
      // Kiểm tra trùng lặp
      if (!this.selectedSchedules.find(s => s.id === schedule.id) && schedule.currentSlots + 1 <= schedule.slots) {
        schedule.currentSlots += 1; // Tăng số lượng đã chọn
        this.selectedSchedules.push(schedule);
      }
    },
    removeSchedule(id: number) {
      this.selectedSchedules = this.selectedSchedules.filter(s => s.id !== id);
    },
    clear() {
      this.selectedSchedules = [];
    },
  },
});
