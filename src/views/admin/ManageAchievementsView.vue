<script setup>
import Header from '@/components/shared/Header.vue';
import {onMounted, ref} from "vue";
import {getAchievements} from "@/services/adminService.js";
import {set} from "@vueuse/core";
import {usePagination} from "@/composables/usePagination.js";
import Pagination from "@/components/shared/Pagination.vue";
import AchievementsList from "@/components/admin/other/AchievementsList.vue";
import {useBlurOnView} from "@/composables/useBlurOnView.js";

const achievements = ref([]);

const manageAchievement = ref(null);
const {blurred} = useBlurOnView(manageAchievement, true);

const {pageState} = usePagination(1, 10, achievements);

const fetchAchievements = async () => {
  await getAchievements().then(res => set(achievements, res.data))
};

const getAchievement = async (achievement) => {
  set(manageAchievement, achievement);
  console.log(achievement);
};

onMounted(fetchAchievements)
</script>

<template>
  <main>
    <Header></Header>
    <AchievementsList :achievements="achievements" @onListItemClick="getAchievement" :class="blurred"/>
    <Pagination v-bind="pageState" @onPageChange="fetchAchievements" />
  </main>
</template>

<style scoped>

</style>