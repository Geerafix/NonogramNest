<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from '@/components/shared/Pagination.vue';
import Select from '@/components/shared/inputs/Select.vue';
import List from '@/components/shared/list/List.vue';
import { getCommunityPuzzles} from '@/services/puzzleService';
import {ref, onBeforeMount, watch, computed} from 'vue';
import {useRouter} from "vue-router";

const page = ref(1);
const limit = ref(10);
const puzzles = ref([]);
const router = useRouter();

const settings = computed(() => ({
  limit: limit.value,
  page: page.value,
  perpage: puzzles.value.length,
  prev: () => page.value -= 1,
  next: () => page.value += 1
}));

const fetchPuzzles = async () => {
    await getCommunityPuzzles(page.value, limit.value).then((res) => puzzles.value = res.data);
};

const handleAction = async (item) => {
    await router.push({name: 'CommunityGame', params: { id: item.created_id }});
};

watch(page, fetchPuzzles);

onBeforeMount(fetchPuzzles);
</script>

<template>
    <main class="view">
        <Header></Header>
        <List class="list" :headers="['ID', 'Nazwa', 'Rozmiar', 'Twórca']" :items="puzzles" @action="handleAction"></List>
        <Pagination v-bind="settings"></Pagination>
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

