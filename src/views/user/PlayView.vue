<script setup>
import Nonogram from '@/components/user/play/Nonogram.vue';
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue';
import Score from "@/components/user/play/Score.vue";
import Actions from "@/components/user/play/Actions.vue";
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
    postSolvedPuzzle(nonogram.id, counter.value, nonogram.points);
}

watch(() => nonogram.paused, (newPaused) => {
    newPaused ? pause() : resume();
});
</script>

<template>
    <main class="flex flex-col">
        <div class="text-white">
            <div class="w-fit relative mx-auto text-4xl font-thin font-sans">Graj</div>
        </div>
        <div class="flex flex-col justify-center h-full mt-8">
            <span v-if="!nonogram.board.length > 0" class="mx-auto mt-2 font-thin font-sans text-white h-full">
                Wybierz rozmiar nonogramu, a następnie
                naciśnij przycisk <span class="italic">'Nowy nonogram'</span>, aby rozpocząć grę.
            </span>
            <div v-else class="h-full self-center">
                <Nonogram v-bind="nonogramSettings" :style="{ opacity: nonogram.paused ? 0.5 : 1, filter: nonogram.paused ? 'blur(3.5px)' : 'blur(0)' }" />
                <Score :counter="counter" :points="nonogram.points"/>
            </div>
            <div class="grid grid-cols-3 gap-2 self-center" :class="{ 'grid-cols-1': nonogram.board.length === 0 }">
              <BasicButton btnText="Nowa gra" class="grid grid-cols-[8rem_auto]" @click="handleNewPuzzle()">
                <Icon icon="fa-solid fa-square-plus" class="my-auto mx-auto" />
              </BasicButton>
              <Actions class="" v-if="nonogram.board.length > 0"
                       :pause="() => nonogram.paused = !nonogram.paused" :check="handleCheck"/>
            </div>
        </div>
    </main>
</template>