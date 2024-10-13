<script setup>
import Header from '@/components/shared/Header.vue';
import List from '@/components/shared/list/List.vue';
import Pagination from "@/components/shared/Pagination.vue";
import {usePagination} from '@/composables/usePagination';
import {useList} from '@/composables/useList';
import {getUserAchievements} from '@/services/achievementsService';
import {onMounted, ref} from 'vue';
import {set} from '@vueuse/core';

const achievements = ref([]);
const {pageState} = usePagination(1, 10, achievements);
const listState = useList(['Nazwa','Opis','Data ukończenia'], achievements, [0,3]);

const fetchUserAchievements = async () => {
  await getUserAchievements({...pageState.value}).then((res) => set(achievements, res.data));
};

onMounted(fetchUserAchievements);
</script>

<template>
  <main>
    <Header></Header>
    <List v-bind="listState"/>
    <Pagination v-bind="pageState" @onPageChange="fetchUserAchievements"/>
  </main>
</template> 
