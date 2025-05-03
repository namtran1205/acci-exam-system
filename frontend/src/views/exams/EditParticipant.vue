<script setup lang="ts">
import { useNewScheduleSelect} from "@/stores/new-schedule-select";
import { useSelectedScheduleList } from "@/stores/schedule-list-select";
import BackButton from "@/components/BackButton.vue";
import FormField from "@/components/FormField.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import { useNewCustomerSelect } from "@/stores/new-customer-select";
import { computed, handleError, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import IconSchedule from "@/components/icons/IconSchedule.vue";
import IconClose from "@/components/icons/IconClose.vue";
import { onMounted } from "vue";
import { useParticipantSelect } from "@/stores/participant-select";

const router = useRouter();
const route = useRoute();

const participantSelect = useParticipantSelect();

const selectedList = useSelectedScheduleList();

const redirectToSchedulesSelect = () => {
  router.push({ name: "Examination Scheduling" });
};


function handleSave() {
    console.log("Save button clicked");
    // Add your save logic here
}

function handleAddSchedule(scheduleId: number) {
    const schedule = selectedList.selectedSchedules.find(
        (schedule) => schedule.id === scheduleId
    );
    if (schedule) {
        //
        console.log(`Set registration ID to: ${scheduleId}`);
    }
}  

function handleRemoveSchedule(scheduleId: number) {
    const scheduleIndex = selectedList.selectedSchedules.findIndex(
        (schedule) => schedule.id === scheduleId
    );
    if (scheduleIndex !== -1) {
        selectedList.selectedSchedules.splice(scheduleIndex, 1);
        // Remove the enrollment from the enrollments array
        console.log(`Removed schedule with ID: ${scheduleId}`);
    } else {
        console.log(`Schedule with ID: ${scheduleId} not found`);
    }
}


</script>

<template>
    <div class="relative flex flex-col">
        <h1 class="mb-8 text-center text-3xl font-bold">Edit Exam Registration</h1>

        <div class="flex items-center justify-between">
        <BackButton />
        <BaseButton
            iconType="Save"
            buttonText="Save"
            @click="handleSave"
        />
        </div>

        <!-- Participant ID-->
        <FormField class="mb-4" label="Participant ID">
            <input
                type="text"
                placeholder="Participant ID"
                :value="participantSelect.participant?.id"
                class="w-full rounded-md bg-gray-500 border border-transparent bg-transparent px-3 py-2 focus:border-transparent focus:outline-none rea"
                readonly
                />
        </FormField>
        <!-- Registed to -->
        <FormField class="mb-4" label="Participant Name">
           
            <input
                type="text"
                placeholder="Participant Name"
                :value="participantSelect.participant?.name"
                class="w-full rounded-md border border-transparent bg-transparent px-3 py-2 focus:border-transparent focus:outline-none"
            >
            
        </FormField>

        <!-- Date of Birth -->
        <FormField class="mb-4" label="Date of Birth">
            <input
                type="date"
                placeholder="Date of Birth"
                :value="participantSelect.participant?.dateOfBirth"
                class="w-full rounded-md border border-transparent bg-transparent px-3 py-2 focus:border-transparent focus:outline-none"
            >
        </FormField>

        <!-- Gender -->
        <RadioGroup
            label="Gender"
            name="gender"
            :value="participantSelect.participant?.gender"
            :choices="['Male', 'Female', 'Other']"
            class="mb-4"
        />

        <!-- Examination Schedule -->
        <div class="mb-4">
            <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Examination Schedule</p>
                <div className="flex gap-1">
                    <BaseButton
                    iconType="Add"
                    buttonText="Add"
                    @click="redirectToSchedulesSelect"
                    />
                </div>
            </div>
                <FormField>
                    <div v-if="selectedList.selectedSchedules.length === 0" 
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
                    <div v-else class="w-full space-y-1 px-3">
                            <div
                                v-for="schedule in selectedList.selectedSchedules"
                                :key="schedule.id"
                               class="border-b last:border-b-0 py-2"
                               @click="handleAddSchedule(schedule.id)"
                            >
                            <div class="flex justify-between items-start">
                                <div class="flex">

                                    <IconSchedule class="mr-3"/>
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
                                    <span class="text-moss mr-2">{{ schedule.slots }}</span>
                                    <button 
                                        class="text-gray-500 hover:text-gray-700"
                                    >
                                        <IconClose class="w-3 h-3" style="fill: black" 
                                        @click="handleRemoveSchedule(schedule.id)"
                                        />
                                    </button>
                                    </div>
                                    </div>
                            </div>
                        </div>
                
                </FormField>       
        </div>

        <div class="flex justify-end">
            <BaseButton
            iconType="Save"
            buttonText="Save"
            @click="handleSave"
            />
        </div>
        
    </div>
</template>