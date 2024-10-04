<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from '@/components/shared/Pagination.vue';
import BasicInput from '@/components/shared/inputs/BasicInput.vue';
import Select from '@/components/shared/inputs/Select.vue';
import List from '@/components/shared/list/List.vue';
import { getCommunityPuzzles } from '@/services/communityService.js';
import { ref, onBeforeMount, watch, computed } from 'vue';
import { useRouter } from "vue-router";
import { ratingSearchBy } from '@/store';
import { set } from '@vueuse/core';

const page = ref(1);
const limit = ref(10);
const puzzles = ref([]);
const router = useRouter();

const searchVal = ref('');
const option = ref('name');

const settings = computed(() => ({
  limit: limit.value,
  page: page.value,
  perpage: puzzles.value.length,
  prev: () => page.value -= 1,
  next: () => page.value += 1
}));

const fetchPuzzles = async () => {
    await getCommunityPuzzles(page.value, limit.value, searchVal.value, option.value)
            .then((res) => set(puzzles, res.data));
};

const handleAction = async (item) => {
    await router.push({name: 'CommunityGame', params: { id: item.created_id }});
};

const setOption = (opt) => set(option, opt);

watch(page, fetchPuzzles);

watch([searchVal, option], () => {
    set(page, 1);
    fetchPuzzles();
});

onBeforeMount(fetchPuzzles);
</script>

<template>
    <main class="view">
        <Header></Header>
        <List class="list" :headers="['ID', 'Nazwa', 'Rozmiar', 'Twórca']" :items="puzzles" @action="handleAction"></List>
        <div class="relative flex gap-2 w-full justify-between">
            <Pagination v-bind="settings"></Pagination>
            <div class="search-container">
                <BasicInput v-model="searchVal" placeholder="Wyszukaj po..."></BasicInput>
                <Select :items="ratingSearchBy" @select="setOption"></Select>
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
.search-container {
    @apply
    flex 
    gap-2;
}
</style>

