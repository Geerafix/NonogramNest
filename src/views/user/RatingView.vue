<script setup>
import Header from '@/components/ui/Header.vue';
import Pagination from '@/components/ui/Pagination.vue';
import Select from '@/components/ui/inputs/Select.vue';
import { sizes, modes } from '@/store';
import { getClassicRating, getDailyChallengeRating } from '@/services/ratingService';
import { ref, computed, onBeforeMount, watch } from 'vue';
import { set } from '@vueuse/core';
import List from '@/components/ui/list/List.vue';

const page = ref(1);
const limit = ref(10);
const rating = ref([]);
const size = ref(null);
const mode = ref(null);

const settings = computed(() => ({
  limit: limit.value,
  page: page.value,
  perpage: rating.value.length,
  prev: () => page.value -= 1,
  next: () => page.value += 1
}));

const setSize = (data) => {
  set(size, data);
};

const setMode = (data) => {
    set(mode, data);
};

const fetchRating = async () => {
    if (mode.value === 'challenge') {
        await getDailyChallengeRating(page.value, limit.value).then((res) => rating.value = res.data );
    } else {
        await getClassicRating(page.value, limit.value, size.value).then((res) => rating.value = res.data );
    }
};

watch(page, fetchRating);

watch(size, fetchRating);

watch(mode, fetchRating);

onBeforeMount(fetchRating);
</script>

<template>
    <main class="view">
        <Header></Header>
        <List class="list" :headers="['Nazwa', 'Punkty', 'Rozwiązanych']" :items="rating"></List>
        <div class="controls-container">
            <Pagination v-bind="settings"></Pagination>
            <div class="controls">
                <Select :items="modes" @select="setMode"></Select>
                <Select :items="sizes" @select="setSize" :class="['test', { 'max-w-0': mode === 'challenge' }]" class="test"></Select>
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
</style>

