<template>
  <div class="relative flex flex-col">
    <h1 class="mb-3 text-center text-3xl font-bold">Takers Registration</h1>
    <button
      @click="goBack"
      class="text-leaf mb-1 flex cursor-pointer items-center font-bold hover:text-lime-900"
    >
      <span class="mr-2 text-xl">&lt;</span>
      <span>Back</span>
    </button>
    <div>
      <Search placeholder="Search for input" v-model="searchQuery" />
    </div>
    <div class="overflow-hidden rounded-md border border-green-500 bg-gray-100 shadow-md">
      <List
        v-for="taker in filteredTakers"
        :key="taker.id"
        :item="taker"
        @view-details="handleViewDetails"
      />
    </div>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import Search from "@/components/Search.vue";
import { useRouter } from "vue-router";

const router = useRouter();

export default {
  components: {
    List,
    Search,
  },
  data() {
    return {
      takers: [
        {
          id: "ET1000001",
          name: "Nguyễn Phúc An",
          course: "HSK 1",
          shift: "07:30-09:30",
          registeredTo: { name: "Nguyễn Nguyệt Ánh", type: "Individual" },
          phone: "+84 82 815 1104",
          Level: "HSK 6",
          examDate: "2025/05/20",
          examTime: "09:30-12:30",
          examLocation: "Phòng 191, 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM",
          extensions: [
            { date: "2025/04/23", type: "Exemption" },
            { date: "2025/04/24", type: "Other" },
          ],
        },
        {
          id: "ET1000002",
          name: "Trần Đan Huy",
          course: "System Analysis",
          shift: "13:30-15:30",
          registeredTo: { name: "Trần Văn B", type: "Organization" },
          phone: "+84 90 123 4567",
          Level: "HSK 6",
          examDate: "2025/05/20",
          examTime: "09:30-12:30",
          examLocation: "Phòng 191, 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM",
          extensions: [
            { date: "2025/04/23", type: "Exemption" },
            { date: "2025/04/24", type: "Other" },
          ],
        },
        {
          id: "ET1000003",
          name: "Nguyễn Hà Nam Trần",
          course: "IELTS Academic",
          shift: "18:30-20:30",
          registeredTo: { name: "Lê Thị C", type: "Individual" },
          phone: "+84 77 987 6543",
          Level: "HSK 6",
          examDate: "2025/05/20",
          examTime: "09:30-12:30",
          examLocation: "Phòng 191, 227 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM",
          extensions: [
            { date: "2025/04/23", type: "Exemption" },
            { date: "2025/04/24", type: "Other" },
          ],
        },
      ],
      searchQuery: "",
    };
  },
  computed: {
    filteredTakers() {
      if (!this.searchQuery) {
        return this.takers;
      }

      const query = this.searchQuery.toLowerCase();
      return this.takers.filter(
        (taker) =>
          taker.name.toLowerCase().includes(query) ||
          taker.id.toLowerCase().includes(query) ||
          taker.course.toLowerCase().includes(query),
      );
    },
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    handleViewDetails(itemId) {
      const takerDetails = this.takers.find((taker) => taker.id === itemId);
      if (takerDetails) {
        const routeParams = {
          name: "TakerDetails",
          params: { id: itemId },
          query: {
            name: takerDetails.name,
            course: takerDetails.course,
            shift: takerDetails.shift,
            registeredToName: takerDetails.registeredTo ? takerDetails.registeredTo.name : "",
            registeredToType: takerDetails.registeredTo ? takerDetails.registeredTo.type : "",
            phone: takerDetails.phone || "",
            Level: takerDetails.Level || "",
            examDate: takerDetails.examDate || "",
            examTime: takerDetails.examTime || "",
            examLocation: takerDetails.examLocation || "",
            extensions: JSON.stringify(takerDetails.extensions || []),
          },
        };
        console.log("Attempting to push route:", routeParams);
        this.$router.push(routeParams);
      }
    },
  },
};
</script>

<style scoped></style>
