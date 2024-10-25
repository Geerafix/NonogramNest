<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from "@/components/shared/Pagination.vue";
import AchievementsList from "@/components/admin/other/AchievementsList.vue";
import ManageAchievement from "@/components/admin/management/ManageAchievement.vue";
import {set} from "@vueuse/core";
import {onMounted, ref} from "vue";
import {getAchievements} from "@/services/adminService.js";
import {usePagination} from "@/composables/usePagination.js";
import {useBlurOnView} from "@/composables/useBlurOnView.js";

const achievements = ref([]);

const manageAchievement = ref(null);
const {blurred} = useBlurOnView(manageAchievement, false);

const {pageState} = usePagination(1, 10, achievements);

const fetchAchievements = async () => {
  await getAchievements(pageState.value.page, pageState.value.limit)
      .then(res => set(achievements, res.data))
};

const getAchievement = async (achievement) => {
  set(manageAchievement, achievement);
};

onMounted(fetchAchievements)
</script>

<template>
  <main>
    <Header></Header>
    <AchievementsList :achievements="achievements" @onListItemClick="getAchievement" :class="blurred"/>
    <ManageAchievement v-if="manageAchievement" @reject="manageAchievement = null" :achievement="manageAchievement"/>
    <Pagination v-bind="pageState" @onPageChange="fetchAchievements" />
  </main>
</template>

<style scoped>

</style>