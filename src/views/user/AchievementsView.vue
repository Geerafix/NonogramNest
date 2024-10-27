<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from "@/components/shared/Pagination.vue";
import {usePagination} from '@/composables/usePagination';
import {getUserAchievements} from '@/services/achievementsService';
import {onMounted, ref} from 'vue';
import {set} from '@vueuse/core';
import UserAchievementsList from "@/components/user/other/UserAchievementsList.vue";

const achievements = ref([]);
const {pageState} = usePagination(1, 1, achievements);

const fetchUserAchievements = async () => {
  await getUserAchievements(pageState.value.page, pageState.value.limit)
      .then((res) => set(achievements, res.data));
};

onMounted(fetchUserAchievements);
</script>

<template>
  <main>
    <Header></Header>
    <UserAchievementsList :achievements="achievements" />
    <Pagination v-bind="pageState" @onPageChange="fetchUserAchievements"/>
  </main>
</template> 
