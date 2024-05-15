<script setup>
import { onMounted, ref } from 'vue'
import Nonogram from '@/components/nonogram/Nonogram.vue';
import BasicButton from '@/UIcomponents/inputs/BasicButton.vue'
import axios from 'axios';
import { useInterval } from '@vueuse/core';
import { watch } from 'vue';

let answers = ref([]);
let nonogram = ref([]);
let cluesX = ref([]);
let cluesY = ref([]);
let size = 10;
let paused = ref(false);
let { counter, reset, pause, resume } = useInterval(1000, { controls: true });
let points = ref(0);
let status = ref(false);
let msg = ref('');

// funkcja sprawdzająca nasze rozwiązanie
function check() {
    let iX = 0, iY = 0;
    let checkX = [], checkY = [];
    let ansX = 0, ansY = 0;
    for (let row = 0; row < nonogram.value.length; row++) {
        checkX.push([]);
        checkY.push([]);
        for (let col = 0; col < nonogram.value.length; col++) {
            if (answers.value[row][col] === 1) {
                ansX += 1;
            }
            if (answers.value[row][col] === 0 && ansX !== 0) {
                checkX[row][iX++] = ansX;
                ansX = 0;
            }
            if (answers.value[col][row] === 1) {
                ansY += 1;
            }
            if (answers.value[col][row] === 0 && ansY !== 0) {
                checkY[row][iY++] = ansY;
                ansY = 0;
            }
        }
        if (ansX !== 0) {
            checkX[row][iX++] = ansX;
            ansX = 0;
        }
        if (ansY !== 0) {
            checkY[row][iY++] = ansY;
            ansY = 0;
        }
        iX = 0;
        iY = 0;
    }

    let isSolvedX = true, isSolvedY = true;
    cluesX.value.forEach((row, rowIndex) => {
        row.forEach((element, colIndex) => {
            if (element !== checkX[rowIndex][colIndex]) {
                isSolvedX = false;
            }
        });
    });
    cluesY.value.forEach((row, rowIndex) => {
        row.forEach((element, colIndex) => {
            if (element !== checkY[rowIndex][colIndex]) {
                isSolvedY = false;
            }
        });
    });

    if (isSolvedX === true && isSolvedY) {

    } else {

    }
}

// funkcja kolorująca pojedynczą kratkę
function paint(row, col, tile) {
    if (answers.value[row][col] === 0) {
        answers.value[row][col] = 1;
        tile.style.backgroundColor = 'black';
    } else {
        answers.value[row][col] = 0;
        tile.style.backgroundColor = 'white';
    }
}

// funkcja generująca nowy nonogram
function generateAndFindHints() {
    reset();
    resume();
    paused.value = false;
    answers.value = [];
    nonogram.value = [];
    cluesX.value = [];
    cluesY.value = [];
    for (let row = 0; row < size; row++) {
        answers.value.push([]);
        nonogram.value.push([]);
        for (let col = 0; col < size; col++) {
            answers.value[row][col] = 0;
            nonogram.value[row].push(Math.floor(Math.random() * 2));
        }
    }
    let ansX = 0, ansY = 0;
    for (let row = 0; row < nonogram.value.length; row++) {
        cluesX.value.push([]);
        cluesY.value.push([]);
        for (let col = 0; col < nonogram.value.length; col++) {
            if (nonogram.value[row][col] === 1) {
                ansX += 1;
            }
            if (nonogram.value[row][col] === 0 && ansX !== 0) {
                cluesX.value[row].push(ansX);
                ansX = 0;
            }
            if (nonogram.value[col][row] === 1) {
                ansY += 1;
            }
            if (nonogram.value[col][row] === 0 && ansY !== 0) {
                cluesY.value[row].push(ansY);
                ansY = 0;
            }
        }
        if (ansX !== 0) {
            cluesX.value[row].push(ansX);
            ansX = 0;
        }
        if (ansY !== 0) {
            cluesY.value[row].push(ansY);
            ansY = 0;
        }
    }
    points.value = Math.pow(nonogram.value.length, 2) * size;
    axios({ method: 'POST', url: 'http://localhost:3000/nonograms', data: { cluesX: JSON.stringify(cluesX.value), cluesY: JSON.stringify(cluesY.value) }});
}

watch(paused, (newPaused) => {
    newPaused ? pause() : resume();
});
</script>

<template>
  <main class="grid grid-rows-[60px_min-content] h-full">
    
    <div class="text-white">
        <div class="w-fit relative mx-auto text-4xl font-thin font-sans">Graj</div>
    </div>
    <div v-if="nonogram.length > 0">
        <Nonogram 
            :cluesX="cluesX" 
            :cluesY="cluesY" 
            :size="nonogram.length" 
            :paint="paused ? () => {} : paint" 
            :style="{ opacity: paused ? 0.5 : 1 }"/>
        <div class="flex mt-4 mx-auto justify-between w-52">
            <div class=" text-white font-thin font-sans">Czas: {{ counter }}s</div>
            <div class=" text-white font-thin font-sans">Punkty: {{ points }}</div>
        </div>
    </div>
    <div v-else class="font-thin font-sans text-white mx-auto mt-2">
        Naciśnij przycisk <span class="italic">'Nowy nonogram'</span>, aby rozpocząć grę.
    </div>
    <div class="flex justify-between mt-auto">
        <BasicButton btnText="Nowy nonogram" @click="generateAndFindHints()" class=""/>
        <BasicButton btnText="Stop" @click="paused = !paused"/>
        <BasicButton btnText="Sprawdź" @click="check()" class=""/>
    </div>
  </main>
</template>
