<script setup>
import NonogramXClues from './NonogramXClues.vue';
import NonogramYClues from './NonogramYClues.vue';
import NonogramBoard from './NonogramBoard.vue';
import { generateAndFindHints, check } from '@/scripts/puzzleScript';
import { reactive, onBeforeMount } from 'vue';

defineProps(['paused', 'started']);

const nonogram = reactive({});

const newGame = () => {
    generateAndFindHints(nonogram, nonogram.size);
};

const resetGame = (option) => {
    switch(option) {
        case 1 : 
            Object.assign(nonogram, {id: 0, board: [], answers: [], cluesX: [], cluesY: [], size: 0});
        case 2 :
            nonogram.answers = nonogram.answers.map(row => row.map(cell => cell = 0));
    }
};

const checkSolution = () => {
    const isSolved = check(nonogram);
    return { isSolved: (isSolved.X && isSolved.Y), lostPoints: isSolved.counter};
};

const paintTile = (row, col) => {
    nonogram.answers[row][col] = (nonogram.answers[row][col] + 1) % 2;
};

defineExpose({ nonogram, newGame, resetGame, checkSolution, paintTile });

onBeforeMount(resetGame);
</script>

<template>
    <main class="nonogram-container" v-if="started">
        <div class="paused-info" v-if="paused">Gra wstrzymana</div>
        <div :class="['nonogram-components', {'paused-filter': paused }]">
            <div class="blank-area">
                <div class="size-info">{{ nonogram.size }} x {{ nonogram.size }}</div>
            </div>
            <NonogramYClues :clues="nonogram.cluesY" />
            <NonogramXClues :clues="nonogram.cluesX" />
            <NonogramBoard 
                :answers="nonogram.answers" 
                :size="nonogram.size" 
                :paint="!paused ? paintTile : () => {}" 
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
    select-none;
}
.nonogram-container {
    @apply 
    relative
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
    z-10;
}
</style>