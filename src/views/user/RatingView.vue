<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from '@/components/shared/Pagination.vue';
import Select from '@/components/shared/inputs/Select.vue';
import List from '@/components/shared/list/List.vue';
import {modes, sizes} from '@/store';
import {getRatingChallenge, getRatingClassic} from '@/services/ratingService';
import {onMounted, ref, watch} from 'vue';
import {set} from '@vueuse/core';
import {useList} from '@/composables/useList';
import {usePagination} from '@/composables/usePagination';

const size = ref(null);
const mode = ref(null);
const rating = ref([]);

const listState = useList(['Nazwa', 'Punkty'], rating);
const {pageState} = usePagination(1, 10, rating);

const setSize = (data) => set(size, data);
const setMode = (data) => set(mode, data);

const fetchRating = async () => {
  if (mode.value === 'challenge') {
    await getRatingChallenge({...pageState.value})
        .then((res) => set(rating, res.data));
  } else {
    await getRatingClassic(pageState.value.page, pageState.value.limit, size.value)
        .then((res) => set(rating, res.data));
  }
};

watch([size, mode], fetchRating)

onMounted(fetchRating);
</script>

<template>
  <main class="view">
    <Header></Header>
    <List class="list" v-bind="listState"></List>
    <div class="controls-container">
      <Pagination v-bind="pageState" @onPageChange="fetchRating"></Pagination>
      <div class="controls">
        <Select :items="modes" @onSelect="setMode"/>
        <Select :items="sizes" @onSelect="setSize" :class="['test', { 'hidden': mode === 'challenge' }]"/>
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

</style>

