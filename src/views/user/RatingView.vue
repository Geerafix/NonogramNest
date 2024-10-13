<script setup>
import Header from '@/components/shared/Header.vue';
import Pagination from '@/components/shared/Pagination.vue';
import Select from '@/components/shared/inputs/Select.vue';
import List from '@/components/shared/list/List.vue';
import {modes, sizes} from '@/config.js';
import {getRatingChallenge, getRatingClassic, getRatingUser} from '@/services/ratingService';
import {computed, onMounted, ref, watch} from 'vue';
import {set} from '@vueuse/core';
import {useList} from '@/composables/useList';
import {usePagination} from '@/composables/usePagination';
import UserProfile from "@/components/user/profile/UserProfile.vue";

const size = ref(null);
const mode = ref(null);
const rating = ref([]);
const viewedUser = ref(null);

const listState = useList(['UID','Nazwa','Punkty'], rating);
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

const fetchUser = async (user) => {
  await getRatingUser(user.user_id).then((res) => set(viewedUser, res.data));
};

const styleOnUserViewed = computed(() =>
    viewedUser.value ? 'opacity-25 brightness-80 blur-sm' : ''
);

watch([size, mode], fetchRating)

onMounted(fetchRating);
</script>

<template>
  <main class="view" @click="viewedUser = null">
    <Header></Header>
    <div :class="[styleOnUserViewed]">
      <List class="list" v-bind="listState" @onListItemClick="fetchUser" />
    </div>
    <div class="controls-container">
      <Pagination v-bind="pageState" @onPageChange="fetchRating"></Pagination>
      <div class="controls">
        <Select :items="modes" @onSelect="setMode"/>
        <Select :items="sizes" @onSelect="setSize" :class="['test', { 'hidden': mode === 'challenge' }]"/>
      </div>
    </div>
    <Transition name="fade">
      <UserProfile v-if="viewedUser" :user="viewedUser" class="viewed-user"/>
    </Transition>
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

.viewed-user {
  @apply
  absolute
  top-1/2
  -translate-y-1/2
  left-1/2
  -translate-x-1/2
  max-w-fit
}
</style>

