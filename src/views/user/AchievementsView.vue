<script setup>
import Pagination from "@/components/shared/Pagination.vue";
import UserAchievementsList from "@/components/user/other/UserAchievementsList.vue";
import {set} from '@vueuse/core';
import {usePagination} from '@/composables/usePagination';
import {getUserAchievements} from '@/services/userService';
import {onMounted, ref} from 'vue';

const achievements = ref([]);
const {pageState} = usePagination(1, 10, achievements);

const fetchUserAchievements = async () => {
  await getUserAchievements(pageState.value.page, pageState.value.limit)
      .then((res) => set(achievements, res.data));
};

onMounted(fetchUserAchievements);
</script>

<template>
  <main>
    <UserAchievementsList :achievements="achievements" />
    <Pagination v-bind="pageState" @onPageChange="fetchUserAchievements"/>
  </main>
</template>
