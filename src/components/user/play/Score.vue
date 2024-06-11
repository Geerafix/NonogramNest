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
  <div class="score-container w-96">
    <span class="item border-r-[3px] pr-3">
          Punkty: <span :class="['transition-all', { 'text-red-500': highlightPoints } ]">{{ props.points }}
      </span>
    </span>
    <span class="item border-l-[3px] pl-3">Czas: <span>{{ props.counter }}s</span></span>
  </div>
</template>

<style scoped>
.score-container {
  @apply grid grid-cols-[1fr_1fr] gap-1 px-3 content-center text-center bg-gray-600 rounded-xl select-none border-b-4 border-gray-700;
}
.item {
  @apply flex justify-center gap-2 text-white font-thin font-sans text-2xl border-gray-700/70 transition-all ease-[cubic-bezier(.01,.78,.22,.99)];
}
</style>
