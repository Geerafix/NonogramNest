<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from '@/components/shared/Pagination.vue';
import BasicInput from '@/components/shared/inputs/BasicInput.vue';
import Select from '@/components/shared/inputs/Select.vue';
import List from '@/components/shared/list/List.vue';
import Switch from '@/components/shared/inputs/Switch.vue';
import {getCommunityPuzzles, getUserPuzzles} from '@/services/communityService.js';
import {onBeforeMount, ref, watch} from 'vue';
import {useRouter} from "vue-router";
import {ratingSearchBy} from '@/store';
import {set} from '@vueuse/core';
import { usePagination } from '@/composables/usePagination';
import { useList } from '@/composables/useList';

const puzzles = ref([]);
const search = ref('');
const option = ref('name');
const whose = ref(false);

const {pageState, pageReset} = usePagination(1, 10, puzzles);
const listState = useList(['ID','Nazwa','Rozmiar','Twórca'], puzzles);
const router = useRouter();

const fetchPuzzles = async (switched) => {
  set(whose, switched);
  if (switched) {
    await getUserPuzzles(pageState.value.page, pageState.value.limit, search.value)
      .then((res) => set(puzzles, res.data));
  } else {
    await getCommunityPuzzles(pageState.value.page, pageState.value.limit, search.value, option.value)
      .then((res) => set(puzzles, res.data));
  }
};

const routeToSelectedGame = async (item) => {
  await router.push({name: 'CommunityGame', params: {id: item.created_id}});
};

const setOption = (opt) => set(option, opt);

watch([search, option], () => {
  pageReset();
  fetchPuzzles(whose.value);
});

onBeforeMount(fetchPuzzles);
</script>

<template>
  <main>
    <Header></Header>
    <List v-bind="listState" @onListItemClick="routeToSelectedGame"/>
      <Pagination v-bind="pageState" @onPageChange="fetchPuzzles(whose)"></Pagination>
      <div class="search-container">
        <BasicInput v-model="search" placeholder="Wyszukaj..."></BasicInput>
        <Select v-if="!whose" :items="ratingSearchBy" @onSelect="setOption"></Select>
        <Switch @onSwitch="fetchPuzzles">
          <Icon icon="fa-solid fa-user" class="icon-fix"/> 
          <Icon icon="fa-solid fa-user-group" class="icon-fix"/>  
        </Switch>
      </div> 
  </main>
</template>

<style scoped>
.search-container {
  @apply
  flex
  gap-2
  absolute
  bottom-0
  right-0;
}
.icon-fix {
  @apply
  my-auto 
  mx-auto 
  text-2xl 
  text-gray-600
}
</style>

