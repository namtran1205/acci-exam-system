<script setup lang="ts">
import { useSelectedScheduleList } from "@/stores/schedule-list-select";
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormField from "@/components/FormField.vue";
import IconSchedule from "@/components/icons/IconSchedule.vue";
import BaseButton from "@/components/BaseButton.vue";

const router = useRouter();

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

const schedules = ref<Schedule[]>([
    {
        id: 1,
        startTime: new Date("2023-10-01T09:00:00"),
        endTime: new Date("2023-10-01T11:00:00"),
        location: "Room A",
        name: "Math Exam",
        price: 100,
        slots: 30,
        currentSlots: 0,
    },
    {
        id: 2,
        startTime: new Date("2023-10-02T14:00:00"),
        endTime: new Date("2023-10-02T16:00:00"),
        location: "Room B",
        name: "Science Exam",
        price: 120,
        slots: 25,
        currentSlots: 25,
    },
    {
        id: 3,
        startTime: new Date("2023-10-03T10:00:00"),
        endTime: new Date("2023-10-03T12:00:00"),
        location: "Room C",
        name: "History Exam",
        price: 110,
        slots: 20,
        currentSlots: 19,
    },
]);



const selectedList = useSelectedScheduleList();

function select(schedule: Schedule) {
  selectedList.addSchedule(schedule); 
  router.back();
}

</script>
<template>
  <div class="relative flex flex-col">
    <h1 class="mb-8 text-center text-3xl font-bold">Examination Scheduling</h1>

    <div class="mb-4">
      <FormField label="Select a schedule: ">
        <div v-if="schedules.length === 0" 
          class="text-center">
          <div class="flex justify-center mb-2">
            <img 
                src="/newparticipant_no_examination.png" 
                alt="No examinations" 
                class="w-24 h-auto opacity-50"
            />
          </div>
          <p class="text-gray-500">No examinations yet...</p>
        </div>
        <div v-else class="w-full space-y-1">   
          <div
            v-for="schedule in schedules"
            :key="schedule.id"
            class="border-b last:border-b-0 px-4 py-2"
            @click="select(schedule)"
          >
            <div class="flex justify-between">
              <div class="flex">
                <div class="flex items-center">
                  <IconSchedule class="mr-3 self-center"/>
                </div>
                <div>
                  <h3 class="font-bold">ID {{ schedule.name}}</h3>
                  <p class="text-sm">{{ new Date(schedule.startTime).toLocaleDateString() }}</p>
                  <p class="text-sm">
                    {{ new Date(schedule.startTime).toLocaleTimeString() }} - {{ new Date(schedule.endTime).toLocaleTimeString() }}
                  </p>
                  <p class="text-sm text-gray-500">{{ schedule.location }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <span class="mr-2 font-bold">
                  {{schedule.currentSlots}} / {{ schedule.slots }}
                </span>    
                <span v-if="schedule.currentSlots >= schedule.slots" class="text-red-500">Full</span>
                <BaseButton v-else @click.stop="select(schedule)" buttonText="Select">Select</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </FormField>
    </div>
  </div>
    
</template>