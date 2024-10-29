<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from '@/components/shared/Pagination.vue';
import BasicInput from '@/components/shared/inputs/BasicInput.vue';
import Select from '@/components/shared/inputs/Select.vue';
import List from '@/components/shared/list/List.vue';
import Switch from '@/components/shared/inputs/Switch.vue';
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import {set} from '@vueuse/core';
import {useRouter} from "vue-router";
import {computed, onBeforeMount, ref, watch} from 'vue';
import {ratingSearchBy} from '@/config.js';
import {useList} from '@/composables/useList';
import {usePagination} from '@/composables/usePagination';
import {getCommunityPuzzles, getUserPuzzles} from '@/services/communityService.js';

const puzzles = ref([]);
const search = ref('');
const option = ref('name');
const whom = ref(false);
const rolledSearch = ref(false);

const {pageState, pageReset} = usePagination(1, 10, puzzles);
const listState = useList(['ID','Nazwa','Rozmiar','Twórca'], puzzles);
const router = useRouter();

const fetchPuzzles = async (switched) => {
  set(whom, switched);
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
  fetchPuzzles(whom.value);
});

const slideHideSelect = computed(() =>
    (whom.value ? 'max-w-0 -mr-2 opacity-0' : 'max-w-36').concat(' transition-all')
);

onBeforeMount(fetchPuzzles);
</script>

<template>
  <main>
    <Header/>
    <List v-bind="listState" @onListItemClick="routeToSelectedGame"/>
    <Pagination v-bind="pageState" @onPageChange="fetchPuzzles(whom)"/>
    <Transition name="slide-left-hidden">
      <BasicButton v-if="!rolledSearch" @click="rolledSearch = !rolledSearch" class="search-roll">
        <Icon icon="fa-solid fa-search" class="icon-fix"/>
      </BasicButton>
    </Transition>
    <Transition name="slide-left-hidden">
      <div class="search-container" v-show="rolledSearch">
        <BasicButton @click="(rolledSearch = false)">
          <Icon icon="fa-solid fa-eye-slash" class="icon-fix"/>
        </BasicButton>
        <BasicInput v-model="search" placeholder="Wyszukaj..."/>
        <Select :class="[slideHideSelect]" :items="ratingSearchBy" @onSelect="setOption"/>
        <Switch @onSwitch="fetchPuzzles">
          <Icon icon="fa-solid fa-user-group" class="icon-fix"/>
          <Icon icon="fa-solid fa-user" class="icon-fix"/>
        </Switch>
      </div>
    </Transition>
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
}
.search-roll {
  @apply
  absolute right-0 bottom-0
}
</style>

