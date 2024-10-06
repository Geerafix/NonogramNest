<script setup>
import Pagination from "@/components/shared/Pagination.vue";
import Header from '@/components/shared/Header.vue';
import List from '@/components/shared/list/List.vue';
import {getPuzzles} from "@/services/puzzleService.js";
import {computed, onMounted, ref, watch} from "vue";

const page = ref(1);
const limit = ref(10);
const puzzles = ref([]);

const settings = computed(() => ({
  limit: limit.value,
  page: page.value,
  perpage: puzzles.value.length,
  prev: () => page.value -= 1,
  next: () => page.value += 1
}));

const fetchPuzzles = async () => {
  await getPuzzles(page.value, limit.value).then((res) => {
    puzzles.value = res.data
  });
}

watch(page, fetchPuzzles);

onMounted(fetchPuzzles);
</script>

<template>
  <main class="flex flex-col">
    <Header></Header>
    <List class="list" :headers="['Id','Wskazówki X','Wskazówki Y','Rozmiar']" :items="puzzles"/>
    <Pagination v-bind="settings"/>
  </main>
</template>

<style scoped>
.view {
  @apply
  flex
  flex-col
}

.list {
  @apply
  h-full
  pr-2
  overflow-auto;
}
</style>