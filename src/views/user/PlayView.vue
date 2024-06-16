<script setup>
import Nonogram from '@/components/user/play/Nonogram.vue';
import Score from "@/components/user/play/Score.vue";
import Actions from "@/components/user/play/Actions.vue";
import Header from "@/components/ui/Header.vue"
import { useInterval } from '@vueuse/core';
import {reactive, watch, computed, ref} from 'vue';
import { postPuzzle, postSolvedPuzzle } from '@/services/puzzleService';
import { generateAndFindHints } from "@/scripts/puzzleScript.js";
import { check } from "@/scripts/puzzleScript.js";

const size = ref(0);
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

const actionSettings = computed(() => ({
    length: nonogram.board.length,
    pause: () => nonogram.paused = !nonogram.paused,
    check: handleCheck,
    size: size.value
}));

function setSize(data) {
    size.value = data;
};

function handleNewPuzzle() {
  generateAndFindHints(nonogram, size.value);
//   postPuzzle(nonogram.cluesX, nonogram.cluesY, size.value)
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
        <Header></Header>
        <div class="flex flex-col h-full">
            <div v-if="nonogram.board.length === 0" class="info">
                <span v-if="size === 0">Wybierz rozmiar planszy nonogramu.</span>
                <span v-else>Naciśnij przycisk z plusem, aby rozpocząć grę.</span>
            </div>
            <div v-else class="h-full overflow-auto">
                <Nonogram v-bind="nonogramSettings"/>
            </div>
            <div class="actions">
                <TransitionGroup name="slide-up">
                    <Actions @handle-new-game="handleNewPuzzle" @handle-size="setSize" key="1" v-bind="actionSettings" />
                    <Score v-if="nonogram.board.length !== 0" key="2" :counter="counter" :points="nonogram.points" />
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
    text-2xl
    font-thin 
    font-sans 
    h-full;
}
.actions {
    @apply 
    flex 
    flex-wrap-reverse 
    justify-end 
    w-full 
    gap-2;
}
</style>