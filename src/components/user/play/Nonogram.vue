<script setup>
import NonogramXClues from './NonogramXClues.vue';
import NonogramYClues from './NonogramYClues.vue';
import NonogramBoard from './NonogramBoard.vue';
import { generateAndFindHints, check } from '@/scripts/puzzleScript';
import { reactive } from 'vue';
const nonogram = reactive({
  id: 0,    
  board: [],
  answers: [],
  cluesX: [],
  cluesY: [],
  size: 0,
  points: 0,
  paused: true
});

const handleNewPuzzle = () => {
    generateAndFindHints(nonogram, nonogram.size);
    nonogram.paused = false;
}

const handleCheck = () => {
    const isSolved = check(nonogram);
    nonogram.points = (nonogram.points - isSolved.counter >= 0) ? nonogram.points - isSolved.counter : 0;
    return { isSolved: (isSolved.X && isSolved.Y), lostPoints: isSolved.counter};
}

const paint = (row, col) => {
    nonogram.answers[row][col] = (nonogram.answers[row][col] + 1) % 2;
};

const handleEndGame = () => {
    Object.assign(nonogram, {id: 0, board: [], answers: [], cluesX: [], cluesY: [], size: 0, points: 0, paused: true});
};

defineExpose({
    nonogram,
    handleNewPuzzle,
    handleCheck,
    handleEndGame,
    paint
});
</script>

<template>
    <main class="nonogram-container">
        <div :class="['paused-info', { 'hidden': !nonogram.paused }]">Gra wstrzymana</div>
        <div :class="['nonogram-components', {'paused-filter': nonogram.paused }]">
            <div class="blank-area">
                <div class="size-info">{{ nonogram.size }} x {{ nonogram.size }}</div>
            </div>
            <NonogramYClues :clues="nonogram.cluesY" />
            <NonogramXClues :clues="nonogram.cluesX" />
            <NonogramBoard :answers="nonogram.answers" :size="nonogram.size" :paint="!nonogram.paused ? paint : () => {}" />
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
    bg-gray-600     
    rounded-xl 
    text-white 
    text-nowrap 
    text-2xl
    select-none
    border-b-4
    border-b-gray-700;
}
.nonogram-container {
    @apply 
    transition-all 
    font-thin 
    font-sans 
    relative;
}
.nonogram-components {
    @apply 
    grid 
    grid-cols-[min-content_1fr] 
    gap-0.5 
    mx-auto 
    w-fit 
    z-10
    transition-all;
}
</style>