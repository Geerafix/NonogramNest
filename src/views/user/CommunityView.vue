<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from '@/components/shared/Pagination.vue';
import BasicInput from '@/components/shared/inputs/BasicInput.vue';
import Select from '@/components/shared/inputs/Select.vue';
import List from '@/components/shared/list/List.vue';
import Switch from '@/components/shared/inputs/Switch.vue';
import {getCommunityPuzzles, getUserPuzzles} from '@/services/communityService.js';
import {computed, onBeforeMount, ref, watch} from 'vue';
import {useRouter} from "vue-router";
import {ratingSearchBy} from '@/store';
import {set} from '@vueuse/core';

const router = useRouter();

const puzzles = ref([]);
const search = ref('');
const option = ref('name');
const whose = ref(false);

const page = ref(1);
const limit = ref(10);
const settings = computed(() => ({
  page: page.value,
  limit: limit.value,
  perpage: puzzles.value.length,
  prev: () => page.value -= 1,
  next: () => page.value += 1,
}));

const fetchPuzzles = async (switched) => {
  set(whose, switched);
  if (switched) {
    await getUserPuzzles(page.value, limit.value, search.value)
      .then((res) => set(puzzles, res.data));
      console.log("One");
  } else {
    await getCommunityPuzzles(page.value, limit.value, search.value, option.value)
      .then((res) => set(puzzles, res.data));
      console.log("Users");
  }
};

const handleAction = async (item) => {
  await router.push({name: 'CommunityGame', params: {id: item.created_id}});
};

const setOption = (opt) => set(option, opt);

watch([search, option], () => {
  set(page, 1);
  fetchPuzzles(whose.value);
});

onBeforeMount(fetchPuzzles);
</script>

<template>
  <main class="view">
    <Header></Header>
    <List class="list"
          :headers="['ID', 'Nazwa', 'Rozmiar', 'Twórca']"
          :items="puzzles"
          @action="handleAction"
    />
    <div class="relative flex gap-2 w-full justify-between">
      <Pagination v-bind="settings" @onPageChange="fetchPuzzles(whose)"></Pagination>
      <div class="search-container">
        <BasicInput v-model="search" placeholder="Wyszukaj..."></BasicInput>
        <Select v-if="!whose" :items="ratingSearchBy" @select="setOption"></Select>
        <Switch @onSwitch="fetchPuzzles">
          <Icon icon="fa-solid fa-user" class="my-auto mx-auto text-2xl text-gray-600"/> 
          <Icon icon="fa-solid fa-user-group" class="my-auto mx-auto text-2xl text-gray-600"/>  
        </Switch>
      </div>
    </div>
  </main>
</template>

<style scoped>
.view {
  @apply
  flex
  flex-col
  relative
}

.list {
  @apply
  h-full
}

.search-container {
  @apply
  flex
  gap-2;
}
</style>

