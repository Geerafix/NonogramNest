<script setup>
import { getPuzzles } from "@/services/puzzleService.js";
import {onMounted, ref, watch, computed } from "vue";
import Pagination from "@/UIcomponents/Pagination.vue";
import ListHeader from "@/components/admin/ListHeader.vue";
import PuzzleListItem from "@/components/admin/puzzles/PuzzleListItem.vue";
import PuzzleItem from "@/components/admin/puzzles/PuzzleItem.vue";

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
    await getPuzzles(page.value, limit.value)
        .then((res) => { puzzles.value = res.data })
        .then((err) => {  });
}

watch(page, fetchPuzzles);

onMounted(fetchPuzzles)
</script>

<template>
    <div class="h-full text-white relative">
        <div class="w-fit relative mx-auto text-4xl font-thin font-sans h-16">Gry</div>
        <Pagination v-bind="settings" />
        <div class="overflow-auto max-h-[calc(100%-9rem)] pr-2">
            <div class="header">
                <ul v-for="header of ['Id','Wskazówki X','Wskazówki Y','Rozmiar']">
                    <li>
                      <ListHeader :headerName="header" />
                    </li>
                </ul>
            </div>
            <ul v-for="(puzzle, idx) in puzzles" class="list" :class="{ 'mb-2': idx < puzzles.length - 1 }">
                <li>
                    <PuzzleListItem>
                      <div v-for="value in puzzle">
                        <PuzzleItem :value="value.length > 15 ? value.slice(0, 15) : value" />
                      </div>
                    </PuzzleListItem>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.header {
  @apply mb-2 p-2 gap-2 bg-gray-900/40 grid grid-cols-[1fr_30%_30%_1fr] sticky top-0 rounded-lg z-10;
}
.list {
  @apply p-2 bg-gray-900/40 rounded-lg mx-auto h-full list-none;
}
</style>