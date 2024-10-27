<script setup>
import Pagination from "@/components/shared/Pagination.vue";
import Header from '@/components/shared/Header.vue';
import List from '@/components/shared/list/List.vue';
import {usePagination} from "@/composables/usePagination";
import {useList} from "@/composables/useList";
import {getPuzzles} from "@/services/adminService";
import {onMounted, ref, watch} from "vue";
import {set} from "@vueuse/core";
import {ratingSearchBy} from "@/config.js";
import Select from "@/components/shared/inputs/Select.vue";
import BasicButton from "@/components/shared/inputs/BasicButton.vue";
import Switch from "@/components/shared/inputs/Switch.vue";
import BasicInput from "@/components/shared/inputs/BasicInput.vue";

const puzzles = ref([]);
const listState = useList(['ID','Nazwa','Rozmiar','Użytkownik','Publiczna?'], puzzles);

const search = ref('');
const option = ref('name');
const rolledSearch = ref(false);

const {pageState, pageReset} = usePagination(1, 10, puzzles);

const fetchPuzzles = async () => {
  await getPuzzles(pageState.value.page, pageState.value.limit, search.value, option.value)
      .then((res) => set(puzzles, res.data));
}

const managePuzzle = (user) => {

};

const setOption = (opt) => set(option, opt);

watch([search, option], () => {
  pageReset();
  fetchPuzzles();
});

onMounted(fetchPuzzles);
</script>

<template>
  <main class="flex flex-col">
    <Header></Header>
    <List class="list" v-bind="listState" @onListItemClick="managePuzzle"/>
    <Pagination v-bind="pageState" @onPageChange="fetchPuzzles"/>
    <Transition name="slide-left-hidden">
      <BasicButton v-if="!rolledSearch" @click="rolledSearch = !rolledSearch" class="absolute right-0 bottom-0">
        <Icon icon="fa-solid fa-search" class="icon-fix"/>
      </BasicButton>
    </Transition>
    <Transition name="slide-left-hidden">
      <div class="search-container" v-show="rolledSearch">
        <BasicButton @click="rolledSearch = false">
          <Icon icon="fa-solid fa-eye-slash" class="icon-fix"/>
        </BasicButton>
        <BasicInput v-model="search" placeholder="Wyszukaj..." />
        <Select :items="ratingSearchBy" @onSelect="setOption" />
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
</style>