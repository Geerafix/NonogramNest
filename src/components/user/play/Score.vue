<script setup>
import { ref, watch } from 'vue';
const props = defineProps([
  'counter',
  'points'
]);

const highlightPoints = ref(false);

watch(() => props.points, () => {
  highlightPoints.value = true;
  setTimeout(() => { highlightPoints.value = false; }, 200);
});
</script>

<template>
  <div class="score-container">
    <span class="item">
          Punkty: <span :class="['transition-all', { 'text-red-500': highlightPoints } ]">{{ props.points }}
      </span>
    </span>
    <span class="item border-l-[3px] pl-3">Czas: <span>{{ props.counter }}s</span></span>
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
  border-r-[3px] 
  pr-3
  font-thin 
  font-sans 
  text-2xl 
  border-gray-700/70 
  transition-all 
  ease-[cubic-bezier(.01,.78,.22,.99)];
}
</style>
