<script setup>
import Pagination from '@/components/shared/Pagination.vue';
import Select from '@/components/shared/inputs/Select.vue';
import List from '@/components/shared/list/List.vue';
import UserProfile from "@/components/user/profile/UserProfile.vue";
import {modes, sizes} from '@/config.js';
import {getRatingChallenge, getRatingClassic, getRatingUser} from '@/services/ratingService';
import {computed, onMounted, ref, watch} from 'vue';
import {set} from '@vueuse/core';
import {useList} from '@/composables/useList';
import {usePagination} from '@/composables/usePagination';
import {useBlurOnView} from "@/composables/useBlurOnView.js";

const size = ref(null);
const mode = ref(null);
const rating = ref([]);
const viewedUser = ref(null);

const listState = useList(['UID','Nazwa','Punkty','Miejsce'], rating);
const {pageState} = usePagination(1, rating);

const {blurred} = useBlurOnView(viewedUser, true);

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

watch([size, mode], fetchRating);

const slideHideSelect = computed(() =>
    (mode.value === 'challenge' ? 'max-w-0 -mr-2 opacity-0' : 'max-w-36').concat(' transition-all')
);

onMounted(fetchRating);
</script>

<template>
  <main>
    <div :class="[blurred]">
      <List v-bind="listState" @onListItemClick="fetchUser"/>
    </div>
    <div class="controls-container">
      <Pagination v-bind="pageState" @onPageChange="fetchRating"/>
      <div class="controls">
        <Select :items="modes" @onSelect="setMode"/>
        <Select :class="[slideHideSelect]" :items="sizes" @onSelect="setSize"/>
      </div>
    </div>
    <Transition name="fade">
      <UserProfile v-if="viewedUser" :user="viewedUser" class="viewed-user"/>
    </Transition>
  </main>
</template>

<style scoped>
.controls {
  @apply
  absolute
  bottom-0
  right-0
  flex
  gap-2
}
.viewed-user {
  @apply
  absolute
  left-1/2
  -translate-x-1/2
  top-1/2
  -translate-y-1/2
}
</style>

