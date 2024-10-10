<script setup>
import Pagination from "@/components/shared/Pagination.vue";
import Header from '@/components/shared/Header.vue';
import List from '@/components/shared/list/List.vue';
import {usePagination} from "@/composables/usePagination";
import {useList} from "@/composables/useList";
import {getPuzzles} from "@/services/adminService";
import {onMounted, ref} from "vue";
import {set} from "@vueuse/core";

const puzzles = ref([]);
const listState = useList(['Id','Wskazówki X','Wskazówki Y','Rozmiar'], puzzles);

const {pageState} = usePagination(1, 10, puzzles);

const fetchPuzzles = async () => {
  await getPuzzles(pageState.value.page, pageState.value.limit).then((res) => set(puzzles, res.data));
}

const managePuzzle = (user) => {

};

onMounted(fetchPuzzles);
</script>

<template>
  <main class="flex flex-col">
    <Header></Header>
    <List class="list" v-bind="listState" @onListItemClick="managePuzzle"/>
    <Pagination v-bind="pageState" @onPageChange="fetchPuzzles"/>
  </main>
</template>

<style scoped>

</style>