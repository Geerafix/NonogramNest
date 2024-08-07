<script setup>
import Header from '@/components/ui/Header.vue';
import Pagination from '@/components/ui/Pagination.vue';
import Select from '@/components/ui/inputs/Select.vue';
import { sizes } from '@/store';
import { getRating } from '@/services/ratingService';
import { ref, computed, onMounted, watch } from 'vue';
import { set } from '@vueuse/core';
import ListHeader from '@/components/admin/ListHeader.vue';
import UserListItem from '@/components/admin/users/UserListItem.vue';
import UserItem from '@/components/admin/users/UserItem.vue';

const page = ref(1);
const limit = ref(1);
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
    await getRating(page.value, limit.value, size.value).then((res) => rating.value = res.data );
};

watch(page, fetchRating);

watch(size, fetchRating);

onMounted(fetchRating);
</script>

<template>
    <main class="view">
        <Header></Header>
        <div class="rating-list">
            <div>
                <ListHeader headerName="Nazwa" />
                <li class="list" v-for="el in rating">
                    <UserItem :value="el.User.username" />
                </li>
            </div>
            <div>
                <ListHeader headerName="Punkty" />
                <li class="list" v-for="el in rating">
                    <UserItem :value="el.totalPoints" />
                </li>
            </div>
        </div>
        <Select :items="sizes" @select="setSize"></Select>
        <Pagination v-bind="settings"></Pagination>
    </main>
</template>

<style scoped>
.view {
    @apply
    flex
    flex-col
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
</style>

