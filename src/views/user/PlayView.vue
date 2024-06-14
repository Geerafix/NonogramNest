<script setup>
import Nonogram from '@/components/user/play/Nonogram.vue';
import Score from "@/components/user/play/Score.vue";
import Actions from "@/components/user/play/Actions.vue";
import Header from "@/components/ui/Header.vue"
import { useInterval } from '@vueuse/core';
import {reactive, watch, computed} from 'vue';
import { postPuzzle, postSolvedPuzzle } from '@/services/puzzleService';
import { generateAndFindHints } from "@/scripts/puzzleScript.js";
import { check } from "@/scripts/puzzleScript.js";

const size = 10;
const { counter, reset, pause, resume } = useInterval(1000, { controls: true });
const nonogram = reactive({
  id: 0,
  board: [],
  answers: [],
  cluesX: [],
  cluesY: [],
  paused: true,
  points: 0
});

const nonogramSettings = computed(() => ({
    cluesX: nonogram.cluesX,
    cluesY: nonogram.cluesY,
    size: nonogram.board.length,
    paused: nonogram.paused,
    paint: !nonogram.paused ? paint : () => {}
}));

function handleNewPuzzle() {
  generateAndFindHints(nonogram, size);
//   postPuzzle(nonogram.cluesX, nonogram.cluesY, size)
//       .then((res) => { nonogram.id = res.data.id });
  reset();
}

function paint(row, col, tile) {
  nonogram.answers[row][col] = (nonogram.answers[row][col] + 1) % 2;
  tile.style.backgroundColor = nonogram.answers[row][col] === 1 ? 'black' : 'white';
}

function handleCheck() {
    const isSolved = check(nonogram);
    (isSolved.X && isSolved.Y) ? console.log('Dobrze') : console.log('Źle');
    nonogram.points = (nonogram.points - isSolved.counter >= 0) ? nonogram.points - isSolved.counter : 0;
    // postSolvedPuzzle(nonogram.id, counter.value, nonogram.points);
}

watch(() => nonogram.paused, (newPaused) => {
    newPaused ? pause() : resume();
});
</script>

<template>
    <main class="flex flex-col">
        <Header>Graj</Header>
        <div class="flex flex-col h-full">
            <span v-if="!nonogram.board.length > 0" class="info">
                Wybierz rozmiar nonogramu, a następnie
                naciśnij przycisk '+', aby rozpocząć grę.
            </span>
            <div v-else class="h-full overflow-auto ">
                <Nonogram v-bind="nonogramSettings"/>
            </div>
            <div class="flex flex-wrap-reverse justify-end w-full gap-2">
                <TransitionGroup name="slide-up">
                    <Actions @handle-new-game="handleNewPuzzle()" key="1" :length="nonogram.board.length"
                       :pause="() => nonogram.paused = !nonogram.paused" :check="handleCheck" />
                    <Score v-if="nonogram.board.length !== 0" key="2" :counter="counter" :points="nonogram.points"/>
                </TransitionGroup>
            </div>
        </div>
    </main>
</template>

<style scoped>
.info {
    @apply 
    mx-auto 
    mt-2 
    font-thin 
    font-sans 
    h-full;
}
</style>