<template>
    <div class="relative flex flex-col">
      <h1 class="mb-8 text-center text-3xl font-bold">New Exam Registration</h1>
      
      <div class="flex items-center justify-between">
        <BackButton/>
        <BaseButton
          iconType="Save"
          buttonText="Save"
          @click="redirectSave"
        />
        </div>

        <!-- Registed to -->
        <FormField class="mb-4" label="Registered to">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center">
              <CustomerAvatar :customerType="selectedCustomer.customerType" class="mr-3"/>
              <div>
                <div class="font-medium">{{ selectedCustomer.name }}</div>
                <div class="text-sm text-gray-600">{{ selectedCustomer.phone }}</div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <IconEdit 
                class="h-5 w-5 text-gray-600 cursor-pointer hover:scale-120 transition-transform duration-200" 
                @click="redirectToEditCustomer"/>
              <IconLoad 
                class="h-5 w-5 text-gray-600 cursor-pointer hover:scale-120 transition-transform duration-200" 
                @click="redirectChangeCustomer" 
              />
            </div>
          </div>
        </FormField>
            
            <!-- Date -->
          <FormField class="mb-4" label="Date">
            <div class="flex items-center justify-between w-full h-full">
                <input
                type="text"
                v-model="date"
                placeholder="YYYY-MM-DD"
                class="w-full border border-transparent rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent"
                readonly
                />
            </div>
          </FormField>

          <!-- Participants -->
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">Participants ({{ countParticipants }})</p>
              <div className="flex gap-1">
                <BaseButton
                  iconType="New"
                  buttonText="New"
                  @click="redirectToNewParticipant"
                  class="mt-2"
                />
                <BaseButton
                  iconType="Import"
                  buttonText="Import"
                  @click="redirectToImportParticipants"
                  class="mt-2"
                />
                
              </div>
            </div>
            
            <SearchBox
              placeholder="Search participants..."
              v-model="searchQuery"   
              class="mb-4"
            />
            
            <FormField class="mb-4">
              <div
                v-for="participant in filteredParticipants"
                :key="participant.id"
                class="border-leaf flex cursor-pointer items-center justify-between border-b p-2 last:border-b-0"
              >
                <div class="flex items-center">
                  <IconIndividual class="mr-3"/>
                  
                  <div>
                    <div class="font-medium">ID {{ participant.id }}</div>
                    <div class="text-sm text-gray-600">by {{ participant.name }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <IconEdit 
                    class="h-5 w-5 text-gray-600 cursor-pointer hover:scale-120 transition-transform duration-200" 
                    @click="redirectToEditParticipant"/>
                  <IconLoad 
                    class="h-5 w-5 text-gray-600 cursor-pointer hover:scale-120 transition-transform duration-200" 
                    @click="redirectChangeCustomer" 
                  />
                </div>
              </div>
            </FormField>
          </div>
        </div>

</template>

<script setup lang="ts">

  import { ref, computed, onMounted} from "vue";
  import { useRouter } from "vue-router";
  import IconEdit from "../../components/icons/IconEdit.vue";
  import IconLoad from "../../components/icons/IconLoad.vue";
  import IconIndividual from "@/components/icons/IconIndividual.vue";
  import IconOrganization from "@/components/icons/IconOrganization.vue";
  import FormField from "@/components/FormField.vue";
  import CustomerAvatar from "@/components/CustomerAvatar.vue";
  import BaseButton from "@/components/BaseButton.vue";
  import BackButton from "@/components/BackButton.vue";
  import SearchBox from "@/components/SearchBox.vue";


   const router = useRouter();

   interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    customerType: "Individual" | "Organization";
  }


  const customers = ref<Customer[]>([
    {
      id: 1, 
      name: "Nguyen Phuc An",
      customerType: "Individual",
      phone: "+1 235 513 1023",
      email: "nguyenphucanptn@gmail.com",
    },
    {
    id: 2,
    name: "Sarah Council",
    customerType: "Organization",
    phone: "+1 235 513 1023",
    email: "haha@gmail.com",
    },
    {
      id: 3,
      name: "Truong Van Minh",
      customerType: "Organization",
      phone: "+1 235 513 1023",
      email: "tranminhvuongtuan@gmail.com",
    },
  ]);

  const selectedCustomer = ref(customers.value[0]);

  const showDropdown = ref(false);

  const selectCustomer = (c: any) => {
    selectedCustomer.value = c;
    showDropdown.value = false;
  };

  const filteredCustomers = computed(() => {
    if (!searchQuery.value) return customers.value;

    const query = searchQuery.value.toLowerCase();
    return customers.value.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) || customer.id.toString().includes(query),
    );
  });

    const date = ref(new Date().toISOString().split("T")[0]);

    const searchQuery = ref("")

    interface Participant {
      id: number;
      name: string;
    }
    
    const participants = ref<Participant[]>([
      {
      id: 22127002,
      name: "Nguyễn Phúc An",
      },
      {
      id: 22127420,
      name: "Nguyễn Hà Nam Trân",
      //examinations: 0,
      },
      {
      id: 22127163,
      name: "Trần Đan Huy",
      //examinations: 1,
      },
    ]);

    const countParticipants = computed(() => participants.value.length);

    // const handleRemoveParticipant = (id: number) => {
    //   participants.value = participants.value.filter((participant) => participant.id !== id);
    // };

    
    const filteredParticipants = computed(() => {
      if (!searchQuery.value) return participants.value;

      const query = searchQuery.value.toLowerCase();
      return participants.value.filter(
        (participant) =>
          participant.name.toLowerCase().includes(query) || participant.id.toString().includes(query),
      );
    });

    const handleRemoveParticipant = (id: number) => {
      participants.value = participants.value.filter((participant) => participant.id !== id);
    };

    const backPage = () => {
      router.go(-1);
    };

    /*BO SUNG*/
    const redirectSave = () => {
      router.push({ name: "exam_registration" });
    };

    const redirectToEditCustomer = () => {
      router.push({ name: "edit_customer", params: { id: selectedCustomer.value.id } });
    };

    const redirectChangeCustomer = () => {
      router.push({ name: "change_customer" });
    };

    const redirectToNewParticipant = () => {
      router.push({ name: "new_participant" });
    };

    const redirectToImportParticipants = () => {
      router.push({ name: "import_participants" });
    };

    const redirectToEditParticipant = () => {
      router.push({ name: "edit_participant" });
    };

</script>