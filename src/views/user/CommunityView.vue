<script setup>
import Pagination from '@/components/shared/Pagination.vue';
import Select from '@/components/shared/inputs/Select.vue';
import List from '@/components/shared/list/List.vue';
import Switch from '@/components/shared/inputs/Switch.vue';
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

const {pageState, pageReset} = usePagination(1, puzzles);
const listState = useList(['ID twórcy planszy', 'Nazwa twórcy planszy', 'Nazwa planszy', 'Rozmiar planszy'], puzzles);
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
    <List v-bind="listState" @onListItemClick="routeToSelectedGame"/>
    <Pagination v-bind="pageState" @onPageChange="fetchPuzzles(whom)"/>
    <Transition name="slide-left-hidden">
      <BasicButton v-if="!rolledSearch" class="search-roll" @click="rolledSearch = !rolledSearch">
        <Icon class="icon-fix" icon="fa-solid fa-search"/>
      </BasicButton>
    </Transition>
    <Transition name="slide-left-hidden">
      <div v-show="rolledSearch" class="search-container">
        <BasicButton @click="(rolledSearch = false)">
          <Icon class="icon-fix" icon="fa-solid fa-eye-slash"/>
        </BasicButton>
        <BasicInput v-model="search" placeholder="Wyszukaj..."/>
        <Select :class="[slideHideSelect]" :items="ratingSearchBy" @onSelect="setOption"/>
        <Switch :displayed="whom ? 'Moje gry' : 'Gry użytkowników'" @onSwitch="fetchPuzzles">
          <Icon class="icon-fix" icon="fa-solid fa-user-group"/>
          <Icon class="icon-fix" icon="fa-solid fa-user"/>
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

