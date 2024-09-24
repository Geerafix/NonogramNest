<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from '@/components/shared/Pagination.vue';
import Select from '@/components/shared/inputs/Select.vue';
import List from '@/components/shared/list/List.vue';
import { getCommunityPuzzles } from '@/services/puzzleService';
import { ref, computed, onBeforeMount, watch } from 'vue';
import { set } from '@vueuse/core';

const puzzles = ref([]);

const fetchPuzzles = async () => {
    await getCommunityPuzzles().then((res) => puzzles.value = res.data);
};

onBeforeMount(fetchPuzzles);
</script>

<template>
    <main class="view">
        <Header></Header>
        <List class="list" :headers="['ID', 'Nazwa', 'Rozmiar', 'Twórca']" :items="puzzles"></List>
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
.controls {
    @apply
    absolute
    bottom-0
    right-0
    flex
    gap-2
    place-self-end
}
.test {
  @apply
  w-fit
  max-w-full
  transition-all   
}
</style>

