<script setup>
import { ref, watch } from 'vue';
import { promiseTimeout } from '@vueuse/core';
const props = defineProps([
  'counter',
  'points'
]);
const highlightPoints = ref(false);

watch(() => props.points, async () => {
  highlightPoints.value = true;
  await promiseTimeout(200);
  highlightPoints.value = false;
});
</script>

<template>
  <div class="score-container">
    <span class="item border-r-[3px]">
      Punkty: <span :class="{'text-red-500': highlightPoints}">{{ props.points }}
    </span>
    </span>
    <div class="item border-l-[3px]">
      Czas:<span>{{ props.counter }}s</span>
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
  ease-[cubic-bezier(.01,.78,.22,.99)];
}
</style>
