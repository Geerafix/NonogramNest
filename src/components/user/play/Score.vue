<script setup>
import { ref, watch } from 'vue';
import { set, promiseTimeout } from '@vueuse/core';

const props = defineProps(['time', 'points']);

const highlightPoints = ref(false);

watch(() => props.points, async () => {
  set(highlightPoints, true);
  await promiseTimeout(200);
  set(highlightPoints, false);
});
</script>

<template>
  <div class="score-container">
    <div class="item border-r-[3px]">
      Punkty: <span :class="{'text-red-500': highlightPoints}">{{ props.points }}</span>
    </div>
    <div class="item border-l-[3px]">
      Czas: <span>{{ props.time }}s</span>
    </div>
  </div>
</template>

<style scoped>
.score-container {
  @apply 
  grid 
  grid-cols-[1fr_1fr] 
  gap-1 
  px-3 
  min-h-14
  content-center 
  text-center 
  bg-gray-600
  border-b-4
  border-gray-700 
  rounded-xl 
  select-none;
  @apply 
  max-sm:w-full 
  sm:w-96;
}
.item {
  @apply 
  flex 
  justify-center 
  gap-2 
  pr-3
  font-thin 
  font-sans 
  text-2xl 
  border-gray-700/70 
  transition-all
  ease-in-out
}
</style>
