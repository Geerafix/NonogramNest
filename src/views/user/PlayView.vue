<script setup>
import Nonogram from '@/components/user/play/Nonogram.vue';
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
import Score from "@/components/user/play/Score.vue";
import Actions from "@/components/user/play/Actions.vue";
import Header from "@/UIcomponents/Header.vue"
import { useInterval } from '@vueuse/core';
import {reactive, watch, computed} from 'vue';
import { postPuzzle, postSolvedPuzzle } from '@/services/puzzleService';
import { generateAndFindHints } from "@/scripts/puzzleScript.js";
import { check } from "@/scripts/puzzleScript.js";
import BasicInput from '@/UIcomponents/inputs/BasicInput.vue';

const size = 6;
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
  postPuzzle(nonogram.cluesX, nonogram.cluesY, size)
      .then((res) => { nonogram.id = res.data.id });
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
    postSolvedPuzzle(nonogram.id, counter.value, nonogram.points);
}

watch(() => nonogram.paused, (newPaused) => {
    newPaused ? pause() : resume();
});
</script>

<template>
    <main class="flex flex-col">
        <Header>Graj</Header>
        <div class="flex flex-col justify-center h-full mt-8">
            <span v-if="!nonogram.board.length > 0" class="mx-auto mt-2 font-thin font-sans text-white h-full">
                Wybierz rozmiar nonogramu, a następnie
                naciśnij przycisk '+', aby rozpocząć grę.
            </span>
            <div v-else class="h-full self-center flex flex-col justify-center -translate-y-4">
                <Nonogram v-bind="nonogramSettings"/>
            </div>
            <div class="grid grid-cols-1 gap-2 self-center" :class="{ 'grid-flow-col': nonogram.board.length !== 0 }">
                <BasicButton class="w-14" @click="handleNewPuzzle()">
                    <Icon icon="fa-solid fa-plus" class="my-auto mx-auto" />
                </BasicButton>
                <Actions v-if="nonogram.board.length !== 0"
                       :pause="() => nonogram.paused = !nonogram.paused" :check="handleCheck" />
                <Score v-if="nonogram.board.length !== 0" :counter="counter" :points="nonogram.points"/>
            </div>
        </div>
    </main>
</template>