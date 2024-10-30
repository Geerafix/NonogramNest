<script setup>
import Pagination from "@/components/shared/Pagination.vue";
import List from '@/components/shared/list/List.vue';
import Select from "@/components/shared/inputs/Select.vue";
import ManagePuzzle from "@/components/admin/management/ManagePuzzle.vue";
import {usePagination} from "@/composables/usePagination";
import {useList} from "@/composables/useList";
import {getPuzzle, getPuzzles} from "@/services/adminService";
import {onMounted, ref, watch} from "vue";
import {set} from "@vueuse/core";
import {ratingSearchBy} from "@/config.js";
import {useBlurOnView} from "@/composables/useBlurOnView.js";
import {useNotification} from "@/composables/useNotification.js";

const puzzles = ref([]);
const listState = useList(['ID','Nazwa','Rozmiar','Użytkownik'], puzzles, [4]);

const search = ref('');
const option = ref('name');
const rolledSearch = ref(false);
const managedPuzzle = ref();


const {notify} = useNotification();
const {pageState, pageReset} = usePagination(1, 10, puzzles);
const {blurred} = useBlurOnView(managedPuzzle, false);

const fetchPuzzles = async () => {
  await getPuzzles(pageState.value.page, pageState.value.limit, search.value, option.value)
      .then((res) => set(puzzles, res.data));
}

const managePuzzle = async (puzzle) => {
  await getPuzzle(puzzle.created_id).then((res) => set(managedPuzzle, res.data));
};

const setOption = (opt) => set(option, opt);

const onAccept = (status, message) => {
  set(managedPuzzle, null);
  fetchPuzzles();
  notify(status, message);
}

watch([search, option], () => {
  pageReset();
  fetchPuzzles();
});

onMounted(fetchPuzzles);
</script>

<template>
  <main>
    <List :class="['list', blurred]" v-bind="listState" @onListItemClick="managePuzzle"/>
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
    <ManagePuzzle v-if="managedPuzzle" @accept="onAccept" @reject="managedPuzzle = null"
                  :id="managedPuzzle?.created_id"
                  :puzzle="JSON.parse(managedPuzzle?.excluded_tiles)" />
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