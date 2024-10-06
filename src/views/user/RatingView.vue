<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from '@/components/shared/Pagination.vue';
import Select from '@/components/shared/inputs/Select.vue';
import { sizes, modes } from '@/store';
import { getRatingClassic, getRatingChallenge } from '@/services/ratingService';
import { ref, computed, onBeforeMount, watch } from 'vue';
import { set } from '@vueuse/core';
import List from '@/components/shared/list/List.vue';

const rating = ref([]);
const size = ref(null);
const mode = ref(null);

const page = ref(1);
const limit = ref(10);
const settings = computed(() => ({
  page: page.value,
  limit: limit.value,
  perpage: rating.value.length,
  prev: () => page.value -= 1,
  next: () => page.value += 1,
  listenTo: [page, size, mode]
}));

const setSize = (data) => {
  set(size, data);
};

const setMode = (data) => {
    set(mode, data);
};

const fetchRating = async () => {
    if (mode.value === 'challenge') {
        await getRatingChallenge(page.value, limit.value).then((res) => rating.value = res.data );
    } else {
        await getRatingClassic(page.value, limit.value, size.value).then((res) => rating.value = res.data );
    }
};

onBeforeMount(fetchRating);
</script>

<template>
    <main class="view">
        <Header></Header>
        <List class="list" :headers="['Nazwa', 'Punkty']" :items="rating"></List>
        <div class="controls-container">
            <Pagination v-bind="settings" @onPageChange="fetchRating"></Pagination>
            <div class="controls">
                <Select :items="modes" @select="setMode"></Select>
                <Select :items="sizes" @select="setSize" :class="['test', { 'hidden': mode === 'challenge' }]" class="test"></Select>
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

