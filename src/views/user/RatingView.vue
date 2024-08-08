<script setup>
import Header from '@/components/ui/Header.vue';
import Pagination from '@/components/ui/Pagination.vue';
import Select from '@/components/ui/inputs/Select.vue';
import { sizes } from '@/store';
import { getRating } from '@/services/ratingService';
import { ref, computed, onBeforeMount, watch } from 'vue';
import { set } from '@vueuse/core';
import List from '@/components/ui/list/List.vue';

const page = ref(1);
const limit = ref(10);
const rating = ref([]);
const size = ref(5);

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

const fetchRating = async () => {
    await getRating(page.value, limit.value, size.value).then((res) => {
        rating.value = res.data.map((el) => ({ username: el.User.username, totalpoints: el.totalPoints })) 
    });
    
};

watch(page, fetchRating);

watch(size, fetchRating);

onBeforeMount(fetchRating);
</script>

<template>
    <main class="view">
        <Header></Header>
        <List :headers="['Nazwa', 'Punkty']" :items="rating"></List>
        <div class="controls-container">
            <Pagination v-bind="settings"></Pagination>
            <Select class="place-self-end" :items="sizes" @select="setSize"></Select>
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
.rating-list {
    @apply
    grid
    grid-cols-2
    gap-2
    h-full
    text-xl
    list-inside
    text-center
    w-[40vw]
    min-w-[300px]
    max-sm:w-full
    place-self-center
}
.list {
  @apply 
  p-2 
  mx-auto
  bg-gray-900/40 
  rounded-lg 
  list-none;
}
li {
    @apply
    grid
    p-4
    bg-cyan-700
    my-2;
}
.rating-header {
    @apply
    w-full
    p-2
    bg-pink-600
}
.controls-container > :last-child {
    @apply
    flex
    absolute
    bottom-0
    right-0
}
</style>

