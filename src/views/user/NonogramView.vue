<script setup>
import Nonogram from '@/components/nonogram/Nonogram.vue';
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue'
import { useInterval } from '@vueuse/core';
import { reactive, watch, ref } from 'vue';
import { postPuzzle, postSolvedPuzzle } from '@/services/puzzleService';

const size = 8;
const { counter, reset, pause, resume } = useInterval(1000, { controls: true });
const nonogram = reactive({ board: [], answers: [], cluesX: [], cluesY: [], paused: true, points: 0 });

const id = ref(0);

// funkcja sprawdzająca nasze rozwiązanie
function check() {
    let iX = 0, iY = 0, checkX = [], checkY = [], ansX = 0, ansY = 0;
    nonogram.board.forEach((row, rowIdx) => {
        checkX.push([]); checkY.push([]);
        row.forEach((col, colIdx) => {
            if (col === 1) ansX += 1;
            if (col === 0 && ansX !== 0) { checkX[rowIdx][iX++] = ansX; ansX = 0; }
            if (nonogram.answers[colIdx][rowIdx] === 1) ansY += 1;
            if (nonogram.answers[colIdx][rowIdx] === 0 && ansY !== 0) { checkY[rowIdx][iY++] = ansY; ansY = 0; }
        });
        if (ansX !== 0) { checkX[rowIdx][iX++] = ansX; ansX = 0; }
        if (ansY !== 0) { checkY[rowIdx][iY++] = ansY; ansY = 0; }
        iX = 0; iY = 0;
    });
    let isSolvedX = nonogram.cluesX.every((row, rowIdx) => row.every((el, colIdx) => el === checkX[rowIdx][colIdx]));
    let isSolvedY = nonogram.cluesY.every((row, rowIdx) => row.every((el, colIdx) => el === checkY[rowIdx][colIdx]));
    (isSolvedX && isSolvedY) ? console.log('Dobrze') : console.log('Źle');
    postSolvedPuzzle(id.value, counter.value, nonogram.points);
}

// funkcja kolorująca pojedynczą kratkę
function paint(row, col, tile) {
  nonogram.answers[row][col] = (nonogram.answers[row][col] + 1) % 2; 
  tile.style.backgroundColor = nonogram.answers[row][col] === 1 ? 'black' : 'white';
}

// funkcja generująca nowy nonogram
function generateAndFindHints() {
    Object.assign(nonogram, { answers: [], board: [], cluesX: [], cluesY: [], paused: false });
    nonogram.answers = Array.from(Array(size), () => Array(size).fill(0));
    nonogram.board = Array.from(Array(size), () => Array(size).fill().map(() => Math.floor(Math.random()*2)));
    nonogram.points = Math.pow(nonogram.board.length, 2) * size;
    nonogram.board.forEach((row, rowIdx) => {
        nonogram.cluesX[rowIdx] = []; nonogram.cluesY[rowIdx] = [];
        let ansX = 0, ansY = 0;
        row.forEach((col, colIdx) => {
            ansX += col;
            ansY += nonogram.board[colIdx][rowIdx];
            if (col === 0 && ansX) {
                nonogram.cluesX[rowIdx].push(ansX);
                ansX = 0;
            }
            if (nonogram.board[colIdx][rowIdx] === 0 && ansY) {
                nonogram.cluesY[rowIdx].push(ansY);
                ansY = 0;
            }
        });
        if (ansX) nonogram.cluesX[rowIdx].push(ansX);
        if (ansY) nonogram.cluesY[rowIdx].push(ansY);
    });
    postPuzzle(nonogram.cluesX, nonogram.cluesY, size).then((res) => { id.value = res.data.id });
    reset();
}

watch(() => nonogram.paused, (newPaused) => {
    newPaused ? pause() : resume();
});
</script>

<template>
    <main class="grid grid-rows-[60px_min-content] h-full">
        <div class="text-white">
            <div class="w-fit relative mx-auto text-4xl font-thin font-sans">Graj</div>
        </div>
        <div v-if="nonogram.board.length > 0">
            <Nonogram :cluesX="nonogram.cluesX" :cluesY="nonogram.cluesY" :size="nonogram.board.length" :paint="nonogram.paused ? () => {} : paint"
                :style="{ opacity: nonogram.paused ? 0.5 : 1, filter: nonogram.paused ? 'blur(3.5px)' : 'blur(0)' }" />
            <div class="flex justify-between w-fit mt-4 mx-auto gap-12">
                <div class=" text-white font-thin font-sans text-2xl">Czas: {{ counter }}s</div>
                <div class=" text-white font-thin font-sans text-2xl">Punkty: {{ nonogram.points }}</div>
            </div>
        </div>
        <div v-else class="mx-auto mt-2 font-thin font-sans text-white">
            Naciśnij przycisk <span class="italic">'Nowy nonogram'</span>, aby rozpocząć grę.
        </div>
        <div class="flex justify-between mt-auto">
            <BasicButton btnText="Nowy nonogram" @click="generateAndFindHints()" />
            <BasicButton btnText="Stop" @click="nonogram.paused = !nonogram.paused" />
            <BasicButton btnText="Sprawdź" @click="check()" />
        </div>
    </main>
</template>
