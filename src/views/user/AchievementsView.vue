<script setup>
import Pagination from "@/components/shared/Pagination.vue";
import UserAchievementsList from "@/components/user/other/UserAchievementsList.vue";
import {set} from '@vueuse/core';
import {usePagination} from '@/composables/usePagination';
import {getAchievedCount, getUserAchievements} from '@/services/userService';
import {onMounted, ref} from 'vue';

const count = ref(null);
const achievements = ref([]);
const {pageState} = usePagination(1, achievements);

const fetchUserAchievements = async () => {
  await getUserAchievements(pageState.value.page, pageState.value.limit)
      .then((res) => set(achievements, res.data));
};

const fetchNumberOfAchieved = async () => {
  await getAchievedCount().then(res => set(count, res.data));
};

onMounted(() => {
  fetchUserAchievements();
  fetchNumberOfAchieved()
});
</script>

<template>
  <main>
    <UserAchievementsList :achievements="achievements" />
    <Pagination v-bind="pageState" @onPageChange="fetchUserAchievements"/>
    <Transition name="fade" mode="out-in">
      <div class="achieved-count" v-if="count">
        <span>{{count}}</span>
        <Icon icon="'fa-solid fa-star" class="ml-4 text-yellow-300"/>
      </div>
    </Transition>
  </main>
</template>

<style scoped>
.achieved-count {
  @apply
  bg-gradient-to-r
  from-gray-700/50
  to-gray-700
  rounded-xl
  absolute
  right-0
  bottom-0
  text-2xl
  h-14
  px-4
  content-center
  select-none
}
</style>
