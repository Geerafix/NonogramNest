<script setup>
import NonogramXClues from './NonogramXClues.vue';
import NonogramYClues from './NonogramYClues.vue';
import NonogramBoard from './NonogramBoard.vue';
import {check, generateAndFindHints} from '@/scripts/puzzleScripts';
import {onBeforeMount, reactive} from 'vue';

defineProps(['paused', 'started']);

const nonogram = reactive({});
const indexes = reactive({x: null, y: null});

const newBoard = () => {
  generateAndFindHints(nonogram, nonogram.size);
};

const resetBoard = () => {
  Object.assign(nonogram, {id: 0, board: [], answers: [], cluesX: [], cluesY: [], size: 0});
};

const checkSolution = () => {
  const isSolved = check(nonogram);
  return {isSolved: (isSolved.X && isSolved.Y), lostPoints: isSolved.counter};
};

const paintAnswer = (row, col) => {
  nonogram.answers[row][col] = (nonogram.answers[row][col] + 1) % 2;
};

const paintExclude = (row, col) => {
  nonogram.answers[row][col] = (nonogram.answers[row][col] - 1) % 2;
};

defineExpose({nonogram, newBoard, resetBoard, paintAnswer, paintExclude, checkSolution});

const highlight = (col, row) => {
  Object.assign(indexes, {x: col, y: row});
};

onBeforeMount(resetBoard);
</script>

<template>
  <main v-if="started" class="nonogram-container">
    <Transition name="fade">
      <div v-if="paused" class="paused-info">Gra wstrzymana</div>
    </Transition>
    <div :class="['nonogram-components', {'paused-filter': paused }]">
      <div class="blank-area">
        <div class="size-info">{{ nonogram.size }} x {{ nonogram.size }}</div>
      </div>
      <NonogramYClues :clues="nonogram.cluesY" :highlightedIdx="indexes.y"/>
      <NonogramXClues :clues="nonogram.cluesX" :highlightedIdx="indexes.x"/>
      <NonogramBoard
          :answers="nonogram.answers"
          :paintAnswer="!paused ? paintAnswer : null"
          :paintExclude="!paused ? paintExclude : null"
          :size="nonogram.size"
          v-on="{highlight: !paused ? highlight : null}"
      />
    </div>
  </main>
</template>

<style scoped>
.blank-area {
  @apply
  content-center
  w-full
  h-full
  border-t-4
  border-l-4
  border-gray-700
  bg-gray-600
  rounded-sm
  rounded-ss-lg;
}

.size-info {
  @apply
  h-fit
  w-fit
  mx-auto
  -rotate-45
  text-gray-400;
}

.paused-filter {
  @apply
  filter
  blur-sm
  transition-all
  duration-300
  brightness-[0.9];
}

.paused-info {
  @apply
  z-10
  absolute
  p-4
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
  border-b-4
  bg-gray-600
  border-b-gray-700
  text-white
  text-2xl
  text-nowrap
  rounded-xl
  select-none
  shadow-2xl
  duration-150;
}

.nonogram-container {
  @apply
  absolute
  left-1/2
  -translate-x-1/2
  top-[15%]
  -translate-y-[15%]
  shadow-2xl
  font-thin
  font-sans;
}

.nonogram-components {
  @apply
  grid
  grid-cols-[min-content_1fr]
  gap-0.5
  w-fit
  mx-auto
  z-10
  transition-all;
}
</style>